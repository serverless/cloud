// @ts-ignore
import { api } from "@serverless/cloud";
import { auth } from "./middleware/auth";
import { user } from "./middleware/user";
import cors from "cors";
import data from "./lib/data";

api.use(cors());
api.use(auth());
api.use(user());

api.get("/messages", async (req, res) => {
  const result = await data.getMessages(req.query.convId);
  res.json(result);
});

api.post("/messages", async (req, res) => {
  const result = await data.sendMessage(
    req.body.convId,
    req.user.id,
    req.body.text
  );
  res.json(result);
});

api.get("/conversations", async (req, res) => {
  const result = await data.getConversations(req.user.id);
  res.json(result);
});

api.post("/conversations", async (req, res) => {
  const { value } = await data.createConversation(req.body.userIds);
  res.json(value);
});

api.put("/typing", async (req, res) => {
  await data.setTyping(req.user.id, req.body.convId, req.body.typing);
  res.status(200).end();
});

api.put("/me", async (req, res) => {
  await data.updateUser(req.user, req.body);
  const user = await data.getUser(req.user.id);
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
        lat: Number.parseFloat(req.query["sw.lat"]),
        lon: Number.parseFloat(req.query["sw.lon"]),
      },
      ne: {
        lat: Number.parseFloat(req.query["ne.lat"]),
        lon: Number.parseFloat(req.query["ne.lon"]),
      },
    });

    res.json(result);
    return;
  }

  if (req.query["center.lat"]) {
    const center = {
      lat: Number.parseFloat(req.query["center.lat"]),
      lon: Number.parseFloat(req.query["center.lon"]),
    };
    const radius = Number.parseFloat(req.query.radius);
    const result = await data.listUsersInCircle(center, radius);
    res.json(result);
    return;
  }

  const users = await data.listAllUsers();
  res.json(users);
});
