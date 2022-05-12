import { api, params } from "@serverless/cloud";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: params.REDIS_URL,
  token: params.REDIS_TOKEN,
});

const data = await redis.get("users");

api.get("/users", async (req, res) => {
  res.json(data);
});
