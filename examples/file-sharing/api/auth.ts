import express from "express";

import { login, logout, register } from "../lib/auth";

// Authentication API
export const router = express.Router();

router.post("/login", login(), async function (req: any, res: any) {
  res.send({
    user: res.locals.user,
    systemWarning: res.locals.systemWarning,
  });
});

router.post("/register", register(), async function (req: any, res) {
  res.send({
    user: res.locals.user,
    systemWarning: res.locals.systemWarning,
  });
});

router.post("/logout", logout(), async function (req: any, res: any) {
  res.status(204).end();
});
