// @ts-ignore
import { api, data } from "@serverless/cloud";

beforeAll(async () => {
  await data.set("user:7215ce0f-20a3-4b56-a0fb-00161f42f4f8", {
    geohash: "5486f83fc32b3bcf",
    id: "7215ce0f-20a3-4b56-a0fb-00161f42f4f8",
    lat: 49.7041763,
    lon: -123.15608540000001,
    name: "Another User",
    sub: "test-user|99999999",
    picture: "another-picture-url",
  });
});

async function deleteMessage({ id, convId }) {
  await data.remove(`conv_${convId}:msg_${id}`);
}

async function deleteConversation({ convId, userId }) {
  const { items: messages } = await data.get(`conv_${convId}:msg_*`);
  await Promise.all(messages.map(({ value }) => deleteMessage(value)));
  await data.remove(`user_${userId}:conv_${convId}`);
}

async function deleteUser(userId) {
  await data.remove(`user:${userId}`);
  const { items } = await data.get(`user_${userId}:conv_*`);
  await Promise.all(items.map(({ value }) => deleteConversation(value)));
}

afterAll(async () => {
  await Promise.all([
    deleteUser("7215ce0f-20a3-4b56-a0fb-00161f42f4f8"),
    deleteUser("b23b3aeb-15aa-5527-9e4f-7094fe053410"),
  ]);
});

test("should create user and update profile", async () => {
  const { body } = await api.put("/me").invoke({
    lat: 49.7041763,
    lon: -123.15608540000001,
    name: "Test User",
    other_property: "something",
    picture: "test-picture-url",
  });

  expect(body).toEqual({
    geohash: "5486f83fc32b3bcf",
    id: "b23b3aeb-15aa-5527-9e4f-7094fe053410",
    lat: 49.7041763,
    lon: -123.15608540000001,
    name: "Test User",
    other_property: "something",
    sub: "cloud-auth0-mock|123456789",
    picture: "test-picture-url",
  });
});

test("should get a user by id", async () => {
  const { body } = await api
    .get("/users/b23b3aeb-15aa-5527-9e4f-7094fe053410")
    .invoke();

  expect(body).toEqual({
    geohash: "5486f83fc32b3bcf",
    id: "b23b3aeb-15aa-5527-9e4f-7094fe053410",
    lat: 49.7041763,
    lon: -123.15608540000001,
    name: "Test User",
    other_property: "something",
    sub: "cloud-auth0-mock|123456789",
    picture: "test-picture-url",
  });
});

test("should get no conversations", async () => {
  const { body } = await api.get("/conversations").invoke();
  expect(body).toEqual({ items: [] });
});

test("should create a new conversation", async () => {
  const { body } = await api.post("/conversations").invoke({
    userIds: [
      "7215ce0f-20a3-4b56-a0fb-00161f42f4f8",
      "b23b3aeb-15aa-5527-9e4f-7094fe053410",
    ],
  });

  const { convId } = body;

  const {
    body: { items: conversations },
  } = await api.get("/conversations").invoke();

  expect(conversations).toContainEqual({
    key: `user_b23b3aeb-15aa-5527-9e4f-7094fe053410:conv_${convId}`,
    value: {
      convId,
      title: "Another User",
      userId: "b23b3aeb-15aa-5527-9e4f-7094fe053410",
      userIds: ["7215ce0f-20a3-4b56-a0fb-00161f42f4f8"],
      picture: "another-picture-url",
    },
  });
});

test("should send a message", async () => {
  const {
    body: { items: conversations },
  } = await api.get("/conversations").invoke();
  const convId = conversations[0].value.convId;

  const { body } = await api.post("/messages").invoke({
    convId,
    text: "Hi!",
  });

  expect(body.value).toEqual({
    convId: convId,
    from: "b23b3aeb-15aa-5527-9e4f-7094fe053410",
    id: expect.any(String),
    text: "Hi!",
  });
});

test("should get nearby users", async () => {
  const { body } = await api
    .get(
      `/users?` +
        `sw.lat=49.61515904368315&` +
        `sw.lon=-123.36547851562501&` +
        `ne.lat=49.79279036138332&` +
        `ne.lon=-122.94662475585939`
    )
    .invoke();

  expect(body.items).toContainEqual({
    key: "user:b23b3aeb-15aa-5527-9e4f-7094fe053410",
    value: {
      geohash: "5486f83fc32b3bcf",
      id: "b23b3aeb-15aa-5527-9e4f-7094fe053410",
      lat: 49.7041763,
      lon: -123.15608540000001,
      name: "Test User",
      other_property: "something",
      sub: "cloud-auth0-mock|123456789",
      picture: "test-picture-url",
    },
  });
});

test("should not find user not in bounds", async () => {
  const { body } = await api
    .get(
      `/users?` +
        `sw.lat=49.62091153920056&` +
        `sw.lon=-122.98860381278503&` +
        `ne.lat=49.798521862069435&` +
        `ne.lon=-122.5697500530194`
    )
    .invoke();

  expect(body.items).not.toContainEqual({
    key: "user:b23b3aeb-15aa-5527-9e4f-7094fe053410",
  });
});
