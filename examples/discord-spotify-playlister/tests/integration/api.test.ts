import { api } from "@serverless/cloud";

test("should return users", async () => {
  const { body } = await api.get("/users").invoke();

  expect(body).toHaveProperty("users");
  expect(body.users.length).toBeGreaterThan(0);
});
