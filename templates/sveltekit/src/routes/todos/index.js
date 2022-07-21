import { data } from "@serverless/cloud";
import { v4 as uuid } from "@lukeed/uuid";

export const GET = async ({ locals }) => {
  // locals.userid comes from src/hooks.js
  const { items } = await data.get(`todo#${locals.userid}:*`);

  return {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
    body: {
      todos: items.map((item) => item.value),
    },
  };
};

export const POST = async ({ request, locals }) => {
  const formData = await request.formData();
  const text = formData.get("text");
  const uid = uuid();

  const todo = {
    uid,
    text,
    done: false,
  };

  await data.set(`todo#${locals.userid}:${uid}`, todo);

  return {};
};

// If the user has JavaScript disabled, the URL will change to
// include the method override unless we redirect back to /todos
const redirect = {
  status: 303,
  headers: {
    location: "/todos",
  },
};

export const PATCH = async ({ request, locals }) => {
  const form = await request.formData();

  const uid = form.get("uid");
  const todo = await data.get(`todo#${locals.userid}:${uid}`);

  if (todo) {
    Object.assign(todo, {
      text: form.has("text") ? form.get("text") : todo.text,
      done: form.has("done") ? !!form.get("done") : todo.done,
    });

    await data.set(`todo#${locals.userid}:${uid}`, todo);

    return redirect;
  }

  return {
    status: 404,
  };
};

export const DELETE = async ({ request, locals }) => {
  const form = await request.formData();
  const uid = form.get("uid");

  await data.remove(`todo#${locals.userid}:${uid}`);

  return redirect;
};
