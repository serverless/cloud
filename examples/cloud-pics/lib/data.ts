import { data } from "@serverless/cloud";
import { v5 as uuidv5 } from "uuid";
import crypto from "crypto";
import util from "util";

const pbkdf2 = util.promisify(crypto.pbkdf2);

const USER_UUID_NAMESPACE = "9738E54D-3350-402B-9849-35F0ECEB772C";

export interface User {
  id: string;
  username: string;
  name: string;
  picture: string;
  hashedPassword: string;
  salt: string;
}

export interface ItemList<T> {
  items: T[];
}

export async function createUser({ username, name, password }): Promise<User> {
  const userId = uuidv5(username, USER_UUID_NAMESPACE);

  const salt = crypto.randomBytes(16).toString();

  const hashedPassword = (
    await pbkdf2(password, salt, 310000, 32, "sha256")
  ).toString();

  const result = (await data.set(`user_${userId}`, {
    id: userId,
    username,
    name,
    hashedPassword,
    salt,
  })) as User;

  return result;
}

export async function getUser(userId: string): Promise<User> {
  return (await data.get(`user_${userId}`)) as unknown as User;
}

export async function getUserForSub(sub: string): Promise<User> {
  const userId = uuidv5(sub, USER_UUID_NAMESPACE);

  return (await data.get(`user_${userId}`)) as unknown as User;
}

export async function updateUser(userId: User, props: any) {
  return await data.set(`user_${userId}`, props);
}
