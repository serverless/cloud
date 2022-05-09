import { api } from "@serverless/cloud";
import cookieParser from "cookie-parser";

import { router as authApi } from "./api/auth";
import { router as privateApi } from "./api/private";
import { publicRouter as getApi } from "./api/links";

api.use(cookieParser());

// For demo purposes, log method and path for every request
api.use((req, res, next) => {
  console.log(req.method, req.path);
  return next();
});

// Mount the authentication API
api.use("/auth", authApi);

// Mount the private API
api.use("/api", privateApi);

// Mount the public "get" API
api.use("/get", getApi);
