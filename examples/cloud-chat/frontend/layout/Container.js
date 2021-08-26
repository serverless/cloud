import Container from "react-bootstrap/Container";

export default function AppContainer({ children }) {
  return (
    <Container className="" fluid>
      {children}
    </Container>
  );
}
