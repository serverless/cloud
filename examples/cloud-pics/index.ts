import { api, data, storage } from "@serverless/cloud";
import Jimp from "jimp";
import { ulid } from "ulid";
import cookieParser from "cookie-parser";
import mime from "mime-types";

import { login, logout, register, auth } from "./lib/auth";
import { getImages, getImageById } from "./lib/images";

type Upload = {
  key: string;
  value: {
    id: string;
    username: string;
    filename: string;
  };
};

const width = 512;
const height = 512;

api.use(cookieParser());

api.post("/api/login", login(), async function (req: any, res: any) {
  res.send({
    user: req.user,
    systemWarning: req.systemWarning,
  });
});

api.post("/api/register", register(), async function (req: any, res) {
  res.send({
    user: req.user,
    systemWarning: req.systemWarning,
  });
});

api.post("/api/logout", logout(), async function (req: any, res: any) {
  res.status(204).end();
});

api.get("/api/images", async (req, res) => {
  const items = await getImages();

  res.json({ items });
});

api.get("/api/images/:id", async (req, res) => {
  const image = await getImageById(req.params.id);
  res.json(image);
});

api.use(auth());

api.get("/api/me", async (req: any, res) => {
  res.json({
    user: req.user,
    systemWarning: req.systemWarning,
  });
});

api.post("/api/upload-url", async (req: any, res) => {
  const id = ulid().toLowerCase();

  const { username } = req.user;
  const { filename } = req.body;

  const type = mime.lookup(filename);
  if (!type.startsWith("image/")) {
    throw new Error("Not an image");
  }

  await data.set(`upload:${id}`, {
    id,
    username,
    filename,
  });

  const ext = mime.extension(type);
  const uploadUrl = await storage.getUploadUrl(`uploads/${id}.${ext}`);

  res.json({
    url: uploadUrl,
  });
});

storage.on("write:uploads/*", async ({ path }) => {
  const [id] = path.split("/").pop()!.split(".");

  const upload = (await data.get(`upload:${id}`, {
    meta: true,
  })) as Upload;

  if (!upload) {
    console.log(`Upload not found for ID ${id}`);
    await storage.remove(path);
    return;
  }

  const buffer = (await storage.read(path, { buffer: true })) as Buffer;
  const image = await Jimp.read(buffer);
  image.cover(width, height);

  const publicPath = `public/${id}-${width}-${height}.png`;
  const resizedBuff = await image.getBufferAsync(Jimp.MIME_PNG);

  await storage.write(publicPath, resizedBuff, {
    type: "image/png",
    metadata: { id },
  });
});

storage.on("write:public/*", async ({ path }) => {
  const { lastModified, size, type, metadata } = await storage.stat(path);
  const { id } = metadata;

  const upload = (await data.get(`upload:${id}`, {
    meta: true,
  })) as Upload;

  if (!upload) {
    console.log(`Upload not found for ID ${id}`);
    await storage.remove(path);
    return;
  }

  await data.set(`image:${id}`, {
    lastModified: lastModified.getTime(),
    size,
    type,
    width,
    height,
    ...upload.value,
  });
});
