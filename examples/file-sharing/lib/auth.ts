import { data, params } from "@serverless/cloud";
import crypto from "crypto";
import util from "util";
import jwt from "jsonwebtoken";

const TOKEN_SECRET = params.TOKEN_SECRET || "replace-me";

export interface User {
  username: string;
  name: string;
  email: string;
  hashedPassword: string;
  salt: string;
}

const pbkdf2 = util.promisify(crypto.pbkdf2);

const systemWarning = !params.TOKEN_SECRET
  ? "Make sure to set the TOKEN_SECRET parameter to secure your login tokens"
  : undefined;

export function login() {
  return async (req, res, next) => {
    try {
      const user = await getUser(req.body.username);
      if (!user) {
        throw new Error("Invalid username");
      }

      const hashedPassword = (
        await pbkdf2(req.body.password, user.salt, 310000, 32, "sha256")
      ).toString();

      if (
        !crypto.timingSafeEqual(
          Buffer.from(user.hashedPassword),
          Buffer.from(hashedPassword.toString())
        )
      ) {
        throw new Error("Invalid password");
      }

      res.locals.user = {
        name: user.name,
        username: user.username,
        email: user.email,
      };

      res.locals.token = await createUserToken(res.locals.user);
      res.locals.systemWarning = systemWarning;

      res.cookie("sid", res.locals.token);

      return next();
    } catch (error) {
      return res.status(403).send({
        message: "Login failed",
        systemWarning,
      });
    }
  };
}

export function logout() {
  return async (req, res, next) => {
    res.clearCookie("sid");
    return next();
  };
}

export function register() {
  return async (req, res, next) => {
    try {
      if (
        !req.body.username ||
        !req.body.password ||
        !req.body.name ||
        !req.body.email
      ) {
        throw new Error(
          "Username, full name, email, and password are required"
        );
      }

      const existing = await getUser(req.body.username);
      if (existing) {
        throw new Error("User already exists with that username");
      }

      const user = await createUser(req.body);

      res.locals.user = {
        name: user.name,
        username: user.username,
        email: user.email,
      };

      res.locals.token = await createUserToken(res.locals.user);
      res.locals.systemWarning = systemWarning;

      res.cookie("sid", res.locals.token);

      return next();
    } catch (error) {
      return res.status(403).send({
        message: error.message,
        systemWarning,
      });
    }
  };
}

async function createUserToken(user) {
  return jwt.sign(
    {
      username: user.username,
      name: user.name,
      email: user.email,
    },
    TOKEN_SECRET
  );
}

export function authorize() {
  return async function (req, res, next) {
    try {
      const token =
        req.cookies?.sid || req.get("Authorization")?.replace("Bearer ", "");

      if (!token) {
        throw new Error("No token found");
      }

      res.locals.user = jwt.verify(token, TOKEN_SECRET);
      res.locals.systemWarning = systemWarning;

      return next();
    } catch (error) {
      res.status(403).send({
        message: "Unauthorized",
        systemWarning,
      });
    }
  };
}

async function createUser({ username, name, password, email }): Promise<User> {
  const salt = crypto.randomBytes(16).toString();

  const hashedPassword = (
    await pbkdf2(password, salt, 310000, 32, "sha256")
  ).toString();

  const result = (await data.set(`user_${username}`, {
    username,
    name,
    email,
    hashedPassword,
    salt,
  })) as User;

  return result;
}

async function getUser(username: string): Promise<User> {
  return (await data.get(`user_${username}`)) as unknown as User;
}
