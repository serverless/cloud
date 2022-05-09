import express from "express";

import { authorize } from "../lib/auth";
import { router as uploadApi } from "./upload";
import { router as filesApi } from "./files";
import { router as linksApi } from "./links";

export const router = express.Router();

// Require authorization on these routes
router.use(authorize());

// Return details of the logged in user
router.get("/me", async (req: any, res) => {
  res.send({
    user: res.locals.user,
    systemWarning: res.locals.systemWarning,
  });
});

// Mount the uploads API
router.use("/upload", uploadApi);

// Mount the files API
router.use("/files", filesApi);

// Mount the links API
router.use("/links", linksApi);
