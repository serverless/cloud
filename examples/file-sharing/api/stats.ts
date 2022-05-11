import { api, data, schedule } from "@serverless/cloud";

type Stats = {
  file_count: number;
  user_count: number;
};

export function setup() {
  api.get("/open/stats", async (req, res) => {
    const stats = await data.get<Stats>("global_stats");
    res.json(stats);
  });

  // Update global user count
  data.on("created:user_*", async () => {
    await data.set("global_stats", { user_count: { $add: 1 } });
  });

  data.on("deleted:user_*", async () => {
    await data.set("global_stats", { user_count: { $add: -1 } });
  });

  // Update global and per-user file count
  data.on("created:file_*", async ({ item }) => {
    const { username } = item.value;
    await Promise.all([
      data.set("global_stats", { file_count: { $add: 1 } }),
      data.set(`stats_${username}`, { file_count: { $add: 1 } }),
    ]);
  });

  data.on("deleted:file_*", async ({ item }) => {
    const { username } = item.value;
    await Promise.all([
      data.set("global_stats", { file_count: { $add: -1 } }),
      data.set(`stats_${username}`, { file_count: { $add: -1 } }),
    ]);
  });

  // Log stats every day
  schedule.every("5 minutes", async () => {
    const stats = await data.get<Stats>("global_stats");
    console.log(
      `App has ${stats?.file_count || 0} files and ${
        stats?.user_count || 0
      } users`
    );

    // TODO: send an email notification to admins
  });
}
