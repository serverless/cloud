import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Div100vh from "react-div-100vh";

export default function FullPageView({ children }) {
  return (
    <Div100vh>
      <Container fluid className="h-100">
        <Row className="h-100">{children}</Row>
      </Container>
    </Div100vh>
  );
}
