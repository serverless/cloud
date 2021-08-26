import { proxy } from "valtio";

import createAuth0Client from "@auth0/auth0-spa-js";
import {
  NEXT_PUBLIC_AUTH0_DOMAIN,
  NEXT_PUBLIC_AUTH0_CLIENT_ID,
  NEXT_PUBLIC_AUTH0_AUDIENCE,
  NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_URL,
} from "./config";

const CODE_RE = /[?&]code=[^&]+/;
const STATE_RE = /[?&]state=[^&]+/;
const ERROR_RE = /[?&]error=[^&]+/;

export const hasAuthParams = (searchParams = window.location.search) =>
  (CODE_RE.test(searchParams) || ERROR_RE.test(searchParams)) &&
  STATE_RE.test(searchParams);

let auth0;

class Auth {
  user;
  isAuthenticated = false;
  isLoading = true;
  error;
  position;

  async init() {
    if (typeof window === "undefined") {
      this.isLoading = false;
      return;
    }

    if (auth0) {
      return;
    }

    auth0 = await createAuth0Client({
      domain: NEXT_PUBLIC_AUTH0_DOMAIN,
      client_id: NEXT_PUBLIC_AUTH0_CLIENT_ID,
      audience: NEXT_PUBLIC_AUTH0_AUDIENCE,
      redirect_uri: NEXT_PUBLIC_APP_URL,
      scope: "openid email profile",
      useRefreshTokens: true,
      cacheLocation: "localstorage",
    });

    try {
      if (hasAuthParams()) {
        const { appState } = await auth0.handleRedirectCallback();
        window.history.replaceState(
          {},
          document.title,
          appState?.returnTo || window.location.pathname
        );
      } else {
        await auth0.checkSession();
      }
      this.user = await this.getUser();
      if (this.user) {
        this.isAuthenticated = true;
        this.watchPosition();
      }
      this.isLoading = false;
      this.error = undefined;
    } catch (error) {
      console.log(error);
      this.error = error;
      this.user = undefined;
      this.isAuthenticated = false;
      this.isLoading = false;
    }
  }

  async getToken() {
    return auth0.getTokenSilently();
  }

  async login() {
    await auth0.loginWithRedirect();
  }

  async logout() {
    auth0.logout({
      returnTo: NEXT_PUBLIC_APP_URL,
    });
    this.user = undefined;
    this.isAuthenticated = false;
    this.isLoading = true;
    this.error = undefined;
  }

  async getUser() {
    const identity = await auth0.getUser();
    if (!identity) {
      return;
    }
    const token = await this.getToken();
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/me`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(identity),
    });

    const user = await response.json();

    return user;
  }

  async updatePosition() {
    const identity = await auth0.getUser();
    if (!identity) {
      return;
    }

    const token = await this.getToken();
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/me`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.position),
    });

    this.user = await response.json();
  }

  watchPosition() {
    if (!"geolocation" in navigator) {
      console.warn("geolocation not supported");
      return;
    }

    navigator.geolocation.watchPosition(
      this.geolocationSuccess.bind(this),
      this.geolocationError.bind(this)
    );
  }

  geolocationSuccess({ coords }) {
    this.position = {
      lat: coords.latitude,
      lon: coords.longitude,
    };
    this.updatePosition();
  }

  geolocationError(error) {
    console.log("geolocationError", error);
  }
}

export default proxy(new Auth());
