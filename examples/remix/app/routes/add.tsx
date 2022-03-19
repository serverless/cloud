import type { ActionFunction } from "remix";
import { redirect } from "remix";
import { v4 } from "uuid";

import { data } from "~/data.server";

export const action: ActionFunction = async ({
  request,
}) => {
  const body = await request.formData();
  const name = body.get("name")

  if (name) {
    const id = v4()
    await data.set(`todos:${id}`, { name, id })
  }

  return redirect(`/`);
}
