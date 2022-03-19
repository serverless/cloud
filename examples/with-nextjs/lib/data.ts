import { data } from "@serverless/cloud";

export async function getTodos(status?: string, meta?: any) {
  let result;
  if (status === "all") {
    result = await data.get("todo:*", meta);
  } else if (status === "complete") {
    result = await data.getByLabel("label1", "complete:*", meta);
  } else {
    result = await data.getByLabel("label1", "incomplete:*", meta);
  }

  return {
    items: result.items.map((item) => item.value),
  };
}

export async function getOverdueTodos() {
  return await data.getByLabel(
    "label1",
    `incomplete:<${new Date().toISOString()}`
  );
}

export async function deleteTodo(id) {
  await data.remove(`todo:${id}`);
}

type CreateTodoItem = {
  name: string;
  duedate?: string;
  status?: string;
};

export async function createTodo(id: string, item: CreateTodoItem) {
  await data.set(
    `todo:${id}`,
    {
      ...item,
      createdAt: Date.now(),
    },
    Object.assign(
      {},
      item.status
        ? {
            label1:
              item.status === "complete"
                ? `complete:${new Date().toISOString()}`
                : `incomplete:${item.duedate ? item.duedate : "9999"}`,
          }
        : null
    )
  );
}
