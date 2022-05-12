import { api } from "@serverless/cloud";

test("should return Hello Serverless Cloud!", async () => {
  const { body } = await api.get("/").invoke();
  expect(body).toBe("<h1>Hello Serverless Cloud!</h1>");
});
