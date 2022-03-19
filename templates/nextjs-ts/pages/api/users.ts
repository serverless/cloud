// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { data } from "@serverless/cloud";

export default async function handler(req, res) {
  const { items } = await data.get("user:*");
  res.status(200).json({ users: items.map((item) => item.value) });
}
