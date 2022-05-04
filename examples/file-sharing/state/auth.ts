import { proxy } from "valtio";

class Auth {
  user;
  isAuthenticated = false;
  error;
  position;
  systemWarning;

  async init() {
    const response = await fetch("/api/me");

    const { user, systemWarning } = await response.json();

    if (user) {
      this.user = user;
      this.isAuthenticated = true;
    }

    this.systemWarning = systemWarning;
  }

  async login({ username, password }) {
    const response = await fetch("/auth/login", {
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
    }
    this.error = message;
    this.systemWarning = systemWarning;
  }

  async register({ username, password, name, email }) {
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, name, email }),
    });

    const { user, message, systemWarning } = await response.json();
    if (user) {
      this.user = user;
      this.isAuthenticated = true;
      window.location.href = "/";
    }
    this.error = message;
    this.systemWarning = systemWarning;
  }

  async logout() {
    await fetch("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.user = undefined;
    this.isAuthenticated = false;
    this.error = undefined;
  }
}

export default proxy(new Auth());
