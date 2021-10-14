import { proxy } from "valtio";

import { NEXT_PUBLIC_API_URL } from "./config";

class Auth {
  user;
  isAuthenticated = false;
  error;
  position;
  systemWarning;

  async login({ username, password }) {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const { token, user, message, systemWarning } = await response.json();
    if (token) {
      this.token = token;
      this.user = user;
      this.isAuthenticated = true;
      this.watchPosition();
    }
    this.error = message;
    this.systemWarning = systemWarning;
  }

  async register({ username, password, name }) {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, name }),
    });

    const { token, user, message, systemWarning } = await response.json();
    if (token) {
      this.token = token;
      this.user = user;
      this.isAuthenticated = true;
      this.watchPosition();
    }
    this.error = message;
    this.systemWarning = systemWarning;
  }

  async logout() {
    this.token = undefined;
    this.user = undefined;
    this.isAuthenticated = false;
    this.error = undefined;
  }

  getToken() {
    return this.token;
  }

  async updatePosition() {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/me`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${this.token}`,
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
