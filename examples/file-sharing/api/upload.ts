import { api, data, storage } from "@serverless/cloud";
import { ulid } from "ulid";
import mime from "mime-types";

type Upload = {
  id: string;
  filename: string;
  type: string;
  ext: string;
  username: string;
  size: number;
};

export function setup() {
  api.post("/api/upload", async (req: any, res) => {
    const { filename } = req.body;

    const type = mime.lookup(filename);
    if (!type) {
      res.status(400).json({
        message: "Invalid file type",
      });
      return;
    }

    const ext = mime.extension(type);

    // Create a sortable unique ID for the file
    const id = `${ulid().toLowerCase()}.${ext}`;

    const { username } = res.locals.user;

    // Create an upload item in data
    await data.set(
      `upload_${id}`,
      {
        id,
        filename,
        type,
        ext,
        username,
      },
      {
        // Clean up if upload doesn't happen within an hour
        ttl: 3600,
      }
    );

    // Return a temporary upload URL
    const uploadUrl = await storage.getUploadUrl(`files/${id}`);
    res.json({ id, filename, type, ext, username, url: uploadUrl });
  });

  // Update the file size in data after a file is uploaded
  storage.on("write:files/*", async ({ path, size }) => {
    const id = path.split("/").pop();

    const upload = await data.get<Upload>(`upload_${id}`);
    if (!upload) {
      await storage.remove(`files/${id}`);
    }

    const { filename, type, ext, username } = upload;

    console.log(`File size for file ${id} is ${size}`);

    // Create an file item in data
    await data.set(
      `file_${id}`,
      {
        id,
        filename,
        type,
        ext,
        size,
        username,
      },
      {
        // This lets us look up files by username
        label1: `user_${username}:file_${id}`,
      }
    );
  });

  data.on("created:file_*", async ({ item }) => {
    // Remove the upload item
    await data.remove(`upload_${item.value.id}`);
  });
}
