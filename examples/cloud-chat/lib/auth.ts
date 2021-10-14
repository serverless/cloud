import { params } from "@serverless/cloud";
import crypto from "crypto";
import { getUserForSub, createUser } from "./data";
import util from "util";
import jwt from "jsonwebtoken";

const TOKEN_SECRET = params.TOKEN_SECRET || "replace-me";

const pbkdf2 = util.promisify(crypto.pbkdf2);

export function login() {
  return async (req, res, next) => {
    try {
      const user = await getUserForSub(req.body.username);
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

      req.user = {
        id: user.id,
        name: user.name,
        username: user.username,
      };

      req.token = await createUserToken(req.user);

      if (!params.TOKEN_SECRET) {
        req.systemWarning =
          "Make sure to set the TOKEN_SECRET parameter to secure your login tokens";
      }

      return next();
    } catch (error) {
      console.log(error);
      return res.status(403).send({
        message: "Login failed",
      });
    }
  };
}

export function register() {
  return async (req, res, next) => {
    try {
      if (!req.body.username || !req.body.password || !req.body.name) {
        throw new Error("Username, full name, and password are required");
      }

      const existing = await getUserForSub(req.body.username);
      if (existing) {
        throw new Error("User already exists with that username");
      }

      const user = await createUser(req.body);

      req.user = {
        id: user.id,
        name: user.name,
        username: user.username,
      };

      req.token = await createUserToken(req.user);

      if (!params.TOKEN_SECRET) {
        req.systemWarning =
          "Make sure to set the TOKEN_SECRET parameter to secure your login tokens";
      }

      return next();
    } catch (error) {
      console.log(error);
      return res.status(403).send({
        message: error.message,
      });
    }
  };
}

async function createUserToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, name: user.name },
    TOKEN_SECRET
  );
}

export function auth() {
  return async function (req, res, next) {
    try {
      const token = req.get("Authorization")?.replace("Bearer ", "");
      req.user = jwt.verify(token, TOKEN_SECRET);
      return next();
    } catch (error) {
      console.log("auth()", error);
      res.status(403).send({
        message: "Invalid authorization token",
      });
    }
  };
}
