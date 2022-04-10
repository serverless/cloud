import type { ActionFunction } from "remix";
import { redirect } from "remix";

import { data } from '~/data.server';

export const action: ActionFunction = async ({
  request,
}) => {
  const body = await request.formData();
  const id = body.get("id")

  if (id) {
    await data.remove(`todos:${id}`)
  }

  return redirect(`/`);
}
