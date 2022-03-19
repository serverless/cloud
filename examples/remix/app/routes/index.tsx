import { data } from "~/data.server"

import { json, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

export const loader: LoaderFunction = async () => {
  const { items } = await data.get("todos:*") as any
  return json(items.map((i: any) => i.value))
};

export default function Index() {
  const todos = useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 className="text-3xl font-bold underline">Welcome to Remix</h1>
      <div>
        <h2>Todos</h2>
        <form method="post" action="/add">
          <label><input name="name" type="text" /></label>
          <button type="submit">Add</button>
        </form>
        <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>
            <span>{todo.name}</span>
            <form method="post" action="/remove">
              <label><input type="hidden" name="id" value={todo.id} /></label>
              <button type="submit">Remove</button>
            </form>
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
}
