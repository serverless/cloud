import { data } from "@serverless/cloud";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const prefix = req.query.prefix || "";
    const results = (await data.getByLabel(
      "label1",
      `hosts:${prefix}*`
    )) as any;
    res.send({
      items: results.items.map((item) => ({
        key: item.key.slice(5),
        hostname: item.value.hostname,
        pathname: item.value.pathname,
      })),
    });
  }
}
