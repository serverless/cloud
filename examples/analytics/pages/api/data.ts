import { data } from "@serverless/cloud";

function keyToISODate(_key: string) {
  const [, key] = _key.split(":");
  const year = key.slice(0, 4);
  const month = key.slice(4, 6) || "01";
  const day = key.slice(6, 8) || "01";
  const hour = key.slice(8, 10) || "00";

  return `${year}-${month}-${day}T${hour}:00:00.000Z`;
}

const labels = {
  h: "Hourly visits",
  d: "Daily visits",
  m: "Monthly visits",
  y: "Yearly visits",
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    const hostkey = req.query.host;
    if (!hostkey) {
      res.status(400).send({ error: "host is required" });
      return;
    }

    const period = req.query.period || "h";
    if (!["h", "d", "m", "y"].includes(period)) {
      res.status(400).send({ error: "Invalid period" });
      return;
    }

    const host = (await data.get(`host_${hostkey}`, { meta: false })) as any;
    const result = (await data.get(`host_${hostkey}_${period}:*`, true)) as any;

    res.send({
      total: host?.value || 0,
      series: [
        {
          label: labels[period],
          data: result.items.map((item) => ({
            date: keyToISODate(item.key),
            value: item.value.value,
          })),
        },
      ],
    });
  }
}
