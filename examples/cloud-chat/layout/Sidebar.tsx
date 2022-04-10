import Col from "react-bootstrap/Col";
import clsx from "clsx";

export default function Sidebar({ children, selected }) {
  return (
    <Col
      className={clsx(
        "p-0 col-md-4 border-end d-md-block",
        !selected && "d-none"
      )}
      sm={12}
    >
      {children}
    </Col>
  );
}
