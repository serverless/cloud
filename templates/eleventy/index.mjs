import { api, data } from "@serverless/cloud";

api.get("/api", async (req, res) => {
  res.send("<h1>Hello Serverless Cloud!</h1>");
});

api.get("/api/users", async (req, res) => {
  const users = await data.get("user:*");
  res.send(users.items);
});
