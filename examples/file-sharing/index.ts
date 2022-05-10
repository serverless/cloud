import { api } from "@serverless/cloud";
import cookieParser from "cookie-parser";

import { setup as setupAuth } from "./api/auth";
import { setup as setupPrivate } from "./api/private";
import { setup as setupStats } from "./api/stats";

api.use(cookieParser());

// For demo purposes, log method and path for every request
api.use((req, res, next) => {
  console.log(req.method, req.path);
  return next();
});

setupAuth();
setupPrivate();
setupStats();
