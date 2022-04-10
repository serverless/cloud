import { proxy } from "valtio";

class Auth {
  user;
  busy = true;
  isAuthenticated = false;
  error;
  position;
  systemWarning;

  async init() {
    const response = await fetch("/me");

    const { user, systemWarning } = await response.json();

    if (user) {
      this.user = user;
      this.isAuthenticated = true;
      this.watchPosition();
    }

    this.systemWarning = systemWarning;
    this.busy = false
  }

  async login({ username, password }) {
    this.busy = true;

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const { user, message, systemWarning } = await response.json();
    if (user) {
      this.user = user;
      this.isAuthenticated = true;
      this.watchPosition();
    }
    this.error = message;
    this.systemWarning = systemWarning;
    this.busy = false
  }

  async register({ username, password, name }) {
    this.busy = true;

    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, name }),
    });

    const { user, message, systemWarning } = await response.json();
    if (user) {
      this.user = user;
      this.isAuthenticated = true;
      this.watchPosition();
    }
    this.error = message;
    this.systemWarning = systemWarning;
    this.busy = false
  }

  async logout() {
    await fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.user = undefined;
    this.isAuthenticated = false;
    this.error = undefined;
  }

  async updatePosition() {
    const response = await fetch("/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.position),
    });

    this.user = await response.json();
  }

  watchPosition() {
    if (!("geolocation" in navigator)) {
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
