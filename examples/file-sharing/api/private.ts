import { api } from "@serverless/cloud";

import { authorize } from "../lib/auth";

import { setup as setupUpload } from "./upload";
import { setup as setupFiles } from "./files";
import { setup as setupLinks } from "./links";

export function setup() {
  // Require authorization on these routes
  api.use("/api", authorize());

  // Return details of the logged in user
  api.get("/api/me", async (req: any, res) => {
    console.log(req.cookies.sid);
    res.send({
      user: res.locals.user,
      systemWarning: res.locals.systemWarning,
    });
  });

  setupUpload();
  setupFiles();
  setupLinks();
}
