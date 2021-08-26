const { schedule, data } = require("@serverless/cloud");

const log = jest.spyOn(console, "log");

beforeAll(async () => {
  await data.set(
    "todo:456",
    {
      id: "456",
      name: "Overdue item",
      status: "incomplete",
    },
    {
      label1: "incomplete:1900-06-30",
    }
  );
});

afterAll(async () => {
  await data.remove("todo:456");
});

test("alerts on overdue items", async () => {
  await schedule.every("60 minutes").invoke();

  expect(log).toBeCalledWith("ALERT: 'Overdue item' is overdue!!!");
});
