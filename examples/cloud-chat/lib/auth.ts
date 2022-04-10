import { params } from "@serverless/cloud";
import crypto from "crypto";
import { getUserForSub, createUser } from "./data";
import util from "util";
import jwt from "jsonwebtoken";

const TOKEN_SECRET = params.TOKEN_SECRET || "replace-me";

const pbkdf2 = util.promisify(crypto.pbkdf2);

const systemWarning = !params.TOKEN_SECRET
  ? "Make sure to set the TOKEN_SECRET parameter to secure your login tokens"
  : "";

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

      res.locals.user = {
        id: user.id,
        name: user.name,
        username: user.username,
      };

      req.token = await createUserToken(res.locals.user);
      res.locals.systemWarning = systemWarning;

      res.cookie("sid", req.token);

      return next();
    } catch (error) {
      console.log(error);
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
      if (!req.body.username || !req.body.password || !req.body.name) {
        throw new Error("Username, full name, and password are required");
      }

      const existing = await getUserForSub(req.body.username);
      if (existing) {
        throw new Error("User already exists with that username");
      }

      const user = await createUser(req.body);

      res.locals.user = {
        id: user.id,
        name: user.name,
        username: user.username,
      };

      req.token = await createUserToken(res.locals.user);
      res.locals.systemWarning = systemWarning;

      res.cookie("sid", req.token);

      return next();
    } catch (error) {
      console.log(error);
      return res.status(403).send({
        message: error.message,
        systemWarning,
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
      const token =
        req.cookies?.sid || req.get("Authorization")?.replace("Bearer ", "");

      res.locals.user = jwt.verify(token, TOKEN_SECRET);
      res.locals.systemWarning = systemWarning;

      return next();
    } catch (error) {
      res.status(403).send({
        message: "Invalid authorization token",
        systemWarning,
      });
    }
  };
}
