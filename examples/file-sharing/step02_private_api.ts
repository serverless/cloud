import express from "express";

import { authorize } from "./lib/auth";
import { router as uploadApi } from "./step03_upload_api";
import { router as filesApi } from "./step04_files_api";
import { router as linksApi } from "./step05_links_api";

export const router = express.Router();

// Require authorization these routes
router.use(authorize());

// Return details of the logged in user
router.get("/me", async (req: any, res) => {
  res.send({
    user: res.locals.user,
    systemWarning: res.locals.systemWarning,
  });
});

router.use("/upload", uploadApi);
router.use("/files", filesApi);
router.use("/links", linksApi);
