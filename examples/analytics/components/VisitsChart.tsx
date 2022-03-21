import { curveLinear } from "d3-shape";
import { Chart } from "react-charts";

const primaryAxis = {
  getValue: (datum) => new Date(datum.date),
};

const secondaryAxes = [
  {
    curve: curveLinear,
    getValue: (datum) => datum.value,
  },
];

export default function VisitsChart({ data }) {
  return (
    <Chart
      options={{
        data,
        primaryAxis,
        secondaryAxes,
      }}
    />
  );
}
