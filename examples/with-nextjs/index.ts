import { schedule } from "@serverless/cloud";
import { getOverdueTodos } from "./lib/data";

schedule.every("60 minutes", async () => {
  console.log(`Checking for overdue TODOs...`);

  let result: any = await getOverdueTodos();

  if (result.items.length === 0) {
    console.log(`Nothing overdue!`);
  }

  for (let item of result.items) {
    // Here we could send an alert
    console.log(`ALERT: '${item.value.name}' is overdue!!!`);
  }
});
