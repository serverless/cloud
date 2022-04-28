import { data, events } from "@serverless/cloud";

// Uncomment the code below to enable on-demand revalidation

// data.on("*:post:*", async ({ item }) => {
//   console.log("revalidating", item.value.slug);

//   // update the post page
//   await events.publish("nextjs.revalidate", {
//     path: `/posts/${item.value.slug}`,
//   });

//   // update the home page in case the post appears in the "More Stories" list
//   await events.publish("nextjs.revalidate", { path: "/" });
// });
