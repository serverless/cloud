import { createTodo, getTodos, deleteTodo } from "../../../lib/data";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.headers);
    console.log(req.body);

    let body = req.body;

    if (body.duedate) {
      body.duedate = new Date(body.duedate).toISOString();
    }

    await createTodo(req.query.id, body);

    // Query all the TODOs again
    let result = await getTodos(req.query.status);

    // Return the updated list of TODOs
    res.send({
      items: result.items,
    });
  } else if (req.method === "DELETE") {
    await deleteTodo(req.query.id);

    // Query all the TODOs again
    let result = await getTodos(req.query.status);

    // Return the updated list of TODOs
    res.send({
      items: result.items,
    });
  }
}
