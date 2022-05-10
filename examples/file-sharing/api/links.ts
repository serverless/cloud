import { api, data, events, params, storage } from "@serverless/cloud";
import { ulid } from "ulid";

type Link = {
  id: string;
  fileid: string;
  expires: string; // ISO-8601 date
};

const LINK_EXPIRY_SECONDS = Number.parseInt(params.LINK_EXPIRY_SECONDS) || 60;

export function setup() {
  // Create a link to a file
  api.post("/api/files/:id/links", async (req: any, res) => {
    const fileid = req.params.id;

    // Create a sortable unique ID for the link
    const id = ulid().toLowerCase();

    const expires = new Date(
      Date.now() + 1000 * LINK_EXPIRY_SECONDS
    ).toISOString();

    await data.set(
      `link_${id}`,
      {
        id,
        fileid,
        expires,
      },
      {
        // So we can look up links for a given file
        label1: `file_${fileid}:link_${id}`,
      }
    );

    res.json({ id, fileid, expires });
  });

  // Get all the links for a given file
  api.get("/api/files/:id/links", async (req: any, res) => {
    const { id } = req.params;
    const result = await data.getByLabel<Link>("label1", `file_${id}:link_*`);
    return res.json(
      result.items.map((item) => ({
        ...item.value,
        url: `${params.CLOUD_URL}/get/${item.value.id}`,
      }))
    );
  });

  // Delete a link
  api.delete("/api/links/:id", async (req: any, res: any) => {
    await data.remove(`link_${req.params.id}`);
    res.status(204).send();
  });

  // When a link is created, send a delayed event when the link expires
  data.on("created:link_*", async ({ item }) => {
    const { id, fileid, expires } = item.value;
    console.log(`Link created: ${id} for file ${fileid}`);
    await events.publish("link.expired", { after: expires }, { id, fileid });
  });

  // When a link expires, delete it
  events.on("link.expired", async ({ body }) => {
    const { id, fileid } = body;
    console.log(`Link expired: ${id} for file ${fileid}`);
    await data.remove(`link_${id}`);
  });

  // The "/get" API is public
  api.get("/get/:linkid", async (req: any, res) => {
    const { linkid } = req.params;
    const result = await data.get<Link>(`link_${linkid}`);
    if (!result || result.expires < new Date().toISOString()) {
      res.status(404).send({
        message: "Link not found",
      });
      return;
    }

    // Get a download link that expires in a minute
    const url = await storage.getDownloadUrl(`files/${result.fileid}`, 60);
    res.redirect(url);
  });
}
