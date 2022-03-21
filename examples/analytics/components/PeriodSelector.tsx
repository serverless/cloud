import { ButtonGroup, Button } from "react-bootstrap";

export default function PeriodSelector({
  value,
  onChange = (_value: string) => undefined,
}) {
  return (
    <ButtonGroup>
      <Button onClick={() => onChange("h")} active={value === "h"}>
        Hourly
      </Button>
      <Button onClick={() => onChange("d")} active={value === "d"}>
        Daily
      </Button>
      <Button onClick={() => onChange("m")} active={value === "m"}>
        Monthly
      </Button>
      <Button onClick={() => onChange("y")} active={value === "y"}>
        Yearly
      </Button>
    </ButtonGroup>
  );
}
