import { api, data } from "@serverless/cloud";
import { parse } from "cookie";
import fetch from "node-fetch";
import delay from "delay";

describe("files", () => {
  let sid: string;
  let file: any;

  beforeAll(async () => {
    // Remove test user
    await data.remove("user_tester");

    // Remove test files
    const files = await data.getByLabel<any>("label1", "user_tester:file_*");
    await Promise.all(files.items.map((item) => data.remove(item.key)));

    // Create test user and get session id
    const res = await api.post("/auth/register").invoke({
      name: "Tester",
      username: "tester",
      email: "test@example.com",
      password: "test",
    });

    const cookies = parse(res.headers["set-cookie"][0]);

    sid = cookies.sid;
  });

  it("should upload a file", async () => {
    const res = await api.post("/api/upload").invoke(
      {
        filename: "test.txt",
      },
      {
        headers: {
          cookie: `sid=${sid}`,
        },
      }
    );

    expect(res.status).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        url: expect.stringContaining("https://"),
      })
    );

    file = res.body;

    const uploadResult = await fetch(res.body.url, {
      method: "PUT",
      body: "Hello, world!",
    });

    expect(uploadResult.status).toEqual(200);

    // Wait for file item to be created
    for (let i = 0; i < 10; i++) {
      const res: any = await data.get(`file_${file.id}`);
      if (!res?.size) {
        await delay(500);
      }
    }
  });

  it("should list uploaded files", async () => {
    const res = await api.get("/api/files").invoke(
      {},
      {
        headers: {
          cookie: `sid=${sid}`,
        },
      }
    );
    expect(res.status).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        items: expect.arrayContaining([
          expect.objectContaining({
            filename: "test.txt",
            username: "tester",
            id: expect.stringMatching(/\w+\.txt/),
            ext: "txt",
            size: 13,
            type: "text/plain",
          }),
        ]),
      })
    );
  });

  it("should return a file by id", async () => {
    const res = await api.get(`/api/files/${file.id}`).invoke(
      {},
      {
        headers: {
          cookie: `sid=${sid}`,
        },
      }
    );

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      filename: "test.txt",
      username: "tester",
      id: expect.stringMatching(/\w+\.txt/),
      ext: "txt",
      size: 13,
      type: "text/plain",
    });
  });

  it("should download a file", async () => {
    const res = await api.get(`/api/files/${file.id}/download`).invoke(
      {},
      {
        headers: {
          cookie: `sid=${sid}`,
        },
      }
    );

    expect(res.status).toEqual(302);
    expect(res.headers.location).toEqual(
      expect.stringContaining("s3.us-east-1.amazonaws.com")
    );
  });

  it("should delete a file", async () => {
    const res = await api.delete(`/api/files/${file.id}`).invoke(
      {},
      {
        headers: {
          cookie: `sid=${sid}`,
        },
      }
    );

    expect(res.status).toEqual(204);

    const result = await data.get(`file_${file.id}`);
    expect(result).toBeUndefined();
  });
});
