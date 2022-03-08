import { getTodos } from "../../../lib/data";

export default async function handler(req, res) {
  // Call our getTodos function with the status
  let result = await getTodos(req.query.status, req.query.meta ? true : {});

  // Return the results
  res.send({
    items: result.items,
  });
}
