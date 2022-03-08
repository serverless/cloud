/*
  The @serverless/cloud package is included by default in the cloud runtime.
  So you don't have to include it in package.json.
  
  Use 'api' to build REST APIs, 'data' to access Serverless Data, and 'schedule'
  to create scheduled tasks.

  If you want to serve up static assets, just put them in the '/static' folder
*/
import { api, data, schedule, params } from "@serverless/cloud";

/*
 * Simple health check
 */
api.get("/health", async (req, res) => {
  res.send({ status: "ok" });
});

/*
 * Create a route to GET our TODO items
 */
api.get("/todos", async (req, res) => {
  // Call our getTodos function with the status
  let result = await getTodos(req.query.status, req.query.meta ? true : {});
  // Return the results
  res.send({
    items: result.items,
  });
});

/*
 * Create a route to POST updates to a TODO item
 */
api.post("/todos/:id", async (req, res) => {
  console.log(new Date().toISOString());

  let body = req.body;

  if (body.duedate) {
    body.duedate = new Date(body.duedate).toISOString();
  }

  await data.set(
    `todo:${req.params.id}`,
    {
      ...body,
      createdAt: Date.now(),
    },
    Object.assign(
      {},
      req.body.status
        ? {
            label1:
              body.status === "complete"
                ? `complete:${new Date().toISOString()}`
                : `incomplete:${body.duedate ? body.duedate : "9999"}`,
          }
        : null
    )
  );

  // Query all the TODOs again
  let result = await getTodos(req.query.status);

  // Return the updated list of TODOs
  res.send({
    items: result.items,
  });
});

/*
 * Create a route to DELETE a TODO item
 */
api.delete("/todos/:id", async (req, res) => {
  await data.remove(`todo:${req.params.id}`);

  // Query all the TODOs again
  let result = await getTodos(req.query.status);

  // Return the updated list of TODOs
  res.send({
    items: result.items,
  });
});

/*
  This is some custom error handler middleware
*/
// eslint-disable-next-line
api.use((err, req, res, next) => {
  // Errors are also streamed live to your terminal in dev mode.
  console.error(err.stack);

  if (!err.statusCode) {
    err.statusCode = 500;
  }

  const error = {
    name: err.name,
    statusCode: err.statusCode,
    message: err.message,
  };

  res.status(err.statusCode).json(error);
});

/*
  Sometimes you might want to run code on a schedule, like if you want to 
  send alerts when items are overdue.
*/
schedule.every("60 minutes", async () => {
  console.log(`Checking for overdue TODOs...`);

  // Look for items that are overdue
  let overdueItems = await data.getByLabel(
    "label1",
    `incomplete:<${new Date().toISOString()}`
  );

  if (overdueItems.items.length === 0) {
    console.log(`Nothing overdue!`);
  }

  // Loop through the overdue items
  for (let item of overdueItems.items) {
    // Here we could send an alert
    console.log(`ALERT: '${item.value.name}' is overdue!!!`);
  }
});

/*
  This is our getTodos function that we can reuse in different API paths 
*/
const getTodos = async (status, meta) => {
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
};
