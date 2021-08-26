// @ts-ignore
import { data } from "@serverless/cloud";
import ksuid from "ksuid";
import { geo, GeoPoint, Rect } from "./geo";
import { v5 as uuidv5 } from "uuid";

const USER_UUID_NAMESPACE = "9738E54D-3350-402B-9849-35F0ECEB772C";

export type MessageId = string;

export interface Message {
  value: {
    id: MessageId;
    from: UserId;
    convId: ConversationId;
    text: string;
  };
}

export type ConversationId = string;

export interface Conversation {
  value: {
    convId: ConversationId;
  };
}

export interface ChatState {
  convId: ConversationId;
  messages: ItemList<Message>;
  conversations: ItemList<Conversation>;
}

export type UserId = string;

export interface User {
  id: UserId;
  name: string;
  picture: string;
}

export interface ItemList<T> {
  items: T[];
}

export async function getConversations(userId: UserId) {
  const { items } = await data.get(`user_${userId}:conv_*`);
  for (const item of items) {
    item.value.userIds = JSON.parse(item.value.userIds);
  }
  items.sort((a, b) =>
    b.value.mtime > a.value.mtime ? 1 : a.value.mtime > b.value.mtime ? -1 : 0
  );
  return { items };
}

export async function getMessages(convId: string): Promise<ItemList<Message>> {
  return data.get(`conv_${convId}:msg_*`);
}

async function createUserConversation(
  convId: ConversationId,
  user: User,
  users: Array<User>
) {
  const userId = user.id;
  const otherUsers = users.filter((u) => u.id !== userId);

  return data.set(
    `user_${user.id}:conv_${convId}`,
    {
      convId,
      userId,
      userIds: JSON.stringify(otherUsers.map((u) => u.id)),
      title: otherUsers.map((u) => u.name).join(","),
      picture: otherUsers[0].picture,
    },
    { label1: `conv_${convId}:user_${userId}` }
  );
}

export async function createConversation(
  userIds: UserId[]
): Promise<Conversation> {
  const convId = (await ksuid.random()).string;
  const users = await Promise.all(
    userIds.map((userId) => data.get(`user:${userId}`))
  );

  // Create a conversation item for each user
  await Promise.all(
    users.map((user) => createUserConversation(convId, user, users))
  );

  return { value: { convId } };
}

export async function sendMessage(
  convId: string,
  fromUserId: UserId,
  text: string
): Promise<Message> {
  const messageId = (await ksuid.random()).string;

  const message = {
    id: messageId,
    from: fromUserId,
    convId,
    text,
  };

  const { items: userConversations } = await data.getByLabel(
    "label1",
    `conv_${convId}:user_*`
  );

  const mtime = new Date().toISOString();
  await Promise.all([
    data.set(`conv_${convId}:msg_${message.id}`, message),
    ...userConversations.map(({ value }) =>
      data.set(`user_${value.userId}:conv_${value.convId}`, {
        last: text,
        mtime,
      })
    ),
  ]);

  return { value: message };
}

export async function getUser(userId: UserId): Promise<User> {
  return data.get(`user:${userId}`);
}

export async function getUserForSub(sub: string): Promise<User> {
  const userId = uuidv5(sub, USER_UUID_NAMESPACE);

  let user = await data.get(`user:${userId}`);

  try {
    if (!user) {
      user = { id: userId, sub };
      await data.set(`user:${userId}`, user);
    }
  } catch (error) {
    throw error;
  }

  return user;
}

export async function updateUser(user: User, props: any) {
  const geohash = props.lat && geo.hash(props.lat, props.lon);
  await data.set(
    `user:${user.id}`,
    {
      ...props,
      id: user.id,
      geohash,
    },
    geohash && { label1: `users:geo_${geohash}` }
  );
}

export async function listUsersInRect(rect: Rect): Promise<ItemList<User>> {
  const region = geo.region(rect);
  const cells = geo.coverRegion(region);

  const results = await Promise.all(
    cells.map((cell) => {
      return data.getByLabel(
        "label1",
        `users:` +
          `geo_${cell.rangeMin().toToken()}|` +
          `geo_${cell.rangeMax().toToken()}`
      );
    })
  );

  const items = [];
  for (var result of results) {
    items.push(
      ...result.items.filter(({ value }) => {
        return region.containsLL(geo.point(value.lat, value.lon));
      })
    );
  }

  return { items };
}

export async function listUsersInCircle(
  center: GeoPoint,
  radius: number
): Promise<ItemList<User>> {
  const cells = geo.coverCircle(center, radius);

  const results = await Promise.all(
    cells.map((cell) => {
      return data.getByLabel(
        "label1",
        `users:` +
          `geo_${cell.rangeMin().toToken()}|` +
          `geo_${cell.rangeMax().toToken()}`
      );
    })
  );

  const items = [];
  for (var result of results) {
    items.push(
      ...result.items.filter(({ value }) =>
        geo.pointInCircle({ lat: value.lat, lon: value.lon }, center, radius)
      )
    );
  }
  return { items };
}

export async function listAllUsers(): Promise<ItemList<User>> {
  const result = await data.get("user:*");
  return result;
}

export async function setTyping(
  userId: UserId,
  convId: ConversationId,
  typing: boolean
): Promise<void> {
  const { items } = await data.getByLabel("label1", `conv_${convId}:user_*`);
  await Promise.all(
    items
      .filter(({ value }) => value.userId !== userId)
      .map(({ value }) =>
        data.set(`user_${value.userId}:conv_${value.convId}`, {
          typing,
        })
      )
  );
}

export default {
  createConversation,
  sendMessage,
  getConversations,
  getMessages,
  getUser,
  getUserForSub,
  updateUser,
  listAllUsers,
  listUsersInRect,
  listUsersInCircle,
  setTyping,
};
