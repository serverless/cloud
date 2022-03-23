import { data } from "@serverless/cloud";

type Image = {
  key: string;
  value: {
    id: string;
    lastModified: number;
    size: number;
    type: string;
    width: number;
    height: number;
    filename: string;
    username: string;
  };
};

export async function getImages() {
  const { items } = (await data.get("image:*", {
    limit: 100,
    reverse: true,
  })) as {
    items: Image[];
  };

  return items.map(({ value }) => ({
    id: value.id,
    url: `/public/${value.id}-${value.width}-${value.height}.png`,
    width: value.width,
    height: value.height,
    username: value.username,
  }));
}

export async function getImageById(id: string) {
  const { value } = (await data.get(`image:${id}`, {
    meta: true,
  })) as Image;

  return {
    id: value.id,
    url: `/public/${value.id}-${value.width}-${value.height}.png`,
    width: value.width,
    height: value.height,
    username: value.username,
  };
}
