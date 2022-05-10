import { api } from "@serverless/cloud";

import { login, logout, register } from "../lib/auth";

export function setup() {
  api.post("/auth/login", login(), async function (req: any, res: any) {
    res.send({
      user: res.locals.user,
      systemWarning: res.locals.systemWarning,
    });
  });

  api.post("/auth/register", register(), async function (req: any, res) {
    res.send({
      user: res.locals.user,
      systemWarning: res.locals.systemWarning,
    });
  });

  api.post("/auth/logout", logout(), async function (req: any, res: any) {
    res.status(204).end();
  });
}
