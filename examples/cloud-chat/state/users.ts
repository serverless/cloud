import { proxy } from "valtio";
import { throttle } from "lodash";

import auth from "./auth";

class Users {
  items = [];
  bounds;
  center;
  radius;
  ready = false;
  userCache = new Map();

  fetch = throttle(this.fetchInternal, 1000);

  setSearchBounds(bounds) {
    this.bounds = bounds;
    this.fetch();
  }

  setSearchRadius(center, radius) {
    this.center = center;
    this.radius = radius;
    this.bounds = undefined;
    this.fetch();
  }

  async fetchInternal() {
    const searchParams = new URLSearchParams();
    if (this.bounds?.sw) {
      searchParams.append("sw.lat", this.bounds.sw.lat);
      searchParams.append("sw.lon", this.bounds.sw.lon);
      searchParams.append("ne.lat", this.bounds.ne.lat);
      searchParams.append("ne.lon", this.bounds.ne.lon);
    }
    if (this.center) {
      searchParams.append("center.lat", this.center.lat);
      searchParams.append("center.lon", this.center.lon);
      searchParams.append("radius", this.radius);
    }
    const response = await fetch(`/users?${searchParams}`);

    const { items } = await response.json();
    this.items = (items || []).filter((item) => item.value.id !== auth.user.id);
    this.ready = true;
  }

  async getUser(id) {
    if (!this.userCache.get(id)) {
      const response = await fetch('/users/${id}');

      const user = await response.json();
      this.userCache.set(id, user);
    }
    return this.userCache.get(id);
  }
}

export default proxy(new Users());
