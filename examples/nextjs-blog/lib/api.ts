import { data } from "@serverless/cloud";

type DataItem = {
  key: string;
  value: { [key: string]: any };
};

export async function getPostSlugs() {
  const { items } = (await data.getByLabel("label1", "post:*", {
    reverse: true,
  })) as {
    items: DataItem[];
  };
  return items && items.map((item) => item.value.slug);
}

export async function getPostBySlug(
  slug: string,
  fields: string[] = []
): Promise<any> {
  const item = (await data.get(`post:${slug}`)) as any;

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (typeof item[field] !== "undefined") {
      items[field] = item[field];
    }
  });

  return items;
}

export async function getAllPosts(fields: string[] = []) {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.map((slug) => getPostBySlug(slug, fields))
  );

  return posts;
}
