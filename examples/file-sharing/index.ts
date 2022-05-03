import { api, params } from "@serverless/cloud";
import cookieParser from "cookie-parser";

import { router as authApi } from "./step01_login";
import { router as privateApi } from "./step02_private_api";
import { publicRouter as getApi } from "./step05_links_api";

api.use(cookieParser());

if (params.INSTANCE_NAME !== "production") {
  // For demo purposes, log every request
  api.use((req, res, next) => {
    console.log(req.method, req.path);
    return next();
  });
}

// Mount the authentication API
api.use("/auth", authApi);

// Mount the private API
api.use("/api", privateApi);

// Mount the "get" API
api.use("/get", getApi);
