import { api, data } from "@serverless/cloud";

describe("auth", () => {
  beforeAll(async () => {
    await data.remove("user_tester");
  });

  it("should register a new user", async () => {
    const res = await api.post("/auth/register").invoke({
      name: "Tester",
      username: "tester",
      email: "test@example.com",
      password: "test",
    });

    expect(res.status).toEqual(200);
    expect(res.headers["set-cookie"]).toEqual(
      expect.arrayContaining([expect.stringContaining("sid=")])
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        user: {
          name: "Tester",
          username: "tester",
          email: "test@example.com",
        },
      })
    );
  });

  it("should login", async () => {
    const res = await api.post("/auth/login").invoke({
      username: "tester",
      password: "test",
    });

    expect(res.status).toEqual(200);
    expect(res.headers["set-cookie"]).toEqual(
      expect.arrayContaining([expect.stringContaining("sid=")])
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        user: {
          name: "Tester",
          username: "tester",
          email: "test@example.com",
        },
      })
    );
  });

  it("should log out", async () => {
    const res = await api.post("/auth/logout").invoke();
    expect(res.status).toEqual(204);
    expect(res.headers["set-cookie"]).toEqual(
      expect.arrayContaining([expect.stringContaining("sid=;")])
    );
  });
});
