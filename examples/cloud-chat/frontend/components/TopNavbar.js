import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useSnapshot } from "valtio";

import Avatar from "@components/Avatar";

import auth from "@state/auth";
import messages from "@state/messages";
import ChevronLeft from "@icons/ChevronLeft";

import view from "@state/view";

export default function TopNavbar() {
  const { user } = useSnapshot(auth);
  const { selectedConversation } = useSnapshot(messages);

  const title = selectedConversation?.value.title;
  const picture = selectedConversation?.value.picture;

  return (
    <Navbar className="border-bottom">
      <Container fluid>
        <Nav className="d-md-none text-primary">
          <Nav.Link
            className="text-primary"
            onClick={() => (view.current = "search")}
          >
            <ChevronLeft />
          </Nav.Link>
        </Nav>
        <Navbar.Text className="flex-grow-1 text-center d-flex flex-column align-items-center gap-2">
          {picture && <Avatar src={picture} alt={title} />}
          <div>{title}</div>
        </Navbar.Text>
        <Nav>
          <NavDropdown align="end">
            <NavDropdown.Item onClick={() => auth.logout()}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
