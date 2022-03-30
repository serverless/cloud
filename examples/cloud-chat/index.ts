import { api } from "@serverless/cloud";
import cookieParser from "cookie-parser";

import * as data from "./lib/data";
import { login, logout, register, auth } from "./lib/auth";

api.use(cookieParser());

api.get("/health", async (req, res) => {
  res.send({ status: "ok" });
});

api.post("/login", login(), async function (req: any, res: any) {
  res.send({
    user: res.locals.user,
    systemWarning: res.locals.systemWarning,
  });
});

api.post("/register", register(), async function (req: any, res) {
  res.send({
    user: res.locals.user,
    systemWarning: res.locals.systemWarning,
  });
});

api.post("/logout", logout(), async function (req: any, res: any) {
  res.status(204).end();
});

api.use(auth());

api.get("/me", async (req: any, res) => {
  const user = await data.getUser(res.locals.user.id);
  res.json({
    user,
    systemWarning: res.locals.systemWarning,
  });
});

api.get("/messages", async (req, res) => {
  const result = await data.getMessages(req.query.convId.toString());
  res.json(result);
});

api.post("/messages", async (req, res) => {
  const result = await data.sendMessage(
    req.body.convId,
    res.locals.user.id,
    req.body.text
  );
  res.json(result);
});

api.get("/conversations", async (req, res) => {
  const result = await data.getConversations(res.locals.user.id);
  res.json(result);
});

api.post("/conversations", async (req, res) => {
  const { value } = await data.createConversation(req.body.userIds);
  res.json(value);
});

api.put("/typing", async (req, res) => {
  await data.setTyping(res.locals.user.id, req.body.convId, req.body.typing);
  res.status(200).end();
});

api.put("/me", async (req: any, res) => {
  const user = await data.updateUser(res.locals.user.id, req.body);
  res.json(user);
});

api.get("/users/:userId", async (req, res) => {
  const user = await data.getUser(req.params.userId);
  res.json(user);
});

api.get("/users", async (req, res) => {
  if (req.query["sw.lat"]) {
    const result = await data.listUsersInRect({
      sw: {
        lat: Number.parseFloat(req.query["sw.lat"].toString()),
        lon: Number.parseFloat(req.query["sw.lon"].toString()),
      },
      ne: {
        lat: Number.parseFloat(req.query["ne.lat"].toString()),
        lon: Number.parseFloat(req.query["ne.lon"].toString()),
      },
    });

    res.json(result);
    return;
  }

  if (req.query["center.lat"]) {
    const center = {
      lat: Number.parseFloat(req.query["center.lat"].toString()),
      lon: Number.parseFloat(req.query["center.lon"].toString()),
    };
    const radius = Number.parseFloat(req.query.radius.toString());
    const result = await data.listUsersInCircle(center, radius);
    res.json(result);
    return;
  }

  const users = await data.listAllUsers();
  res.json(users);
});
