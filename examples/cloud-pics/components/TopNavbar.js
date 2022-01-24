import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useSnapshot } from "valtio";
import Link from "next/link";
import { useRouter } from "next/router";

import auth from "@state/auth";

import Person from "@icons/Person";
import Upload from "@icons/Upload";
import ChevronLeft from "@icons/ChevronLeft";

import styles from "@styles/TopNavbar.module.css";

export default function TopNavbar() {
  const { user } = useSnapshot(auth);
  const { pathname } = useRouter();

  return (
    <Navbar className={styles.root}>
      <Container fluid>
        <Nav className="w-100">
        <Navbar.Brand>CloudPics</Navbar.Brand>
          <Nav.Item className="flex-grow-1">
            {pathname !== "/" && (
              <Link href="/">
                <a className="nav-link">
                  <ChevronLeft />
                </a>
              </Link>
            )}
          </Nav.Item>
          {user && pathname !== "/upload" && (
            <Nav.Item>
              <Link href="/upload">
                <a className="nav-link">
                  <Upload />
                </a>
              </Link>
            </Nav.Item>
          )}
          <NavDropdown align="end" title={<Person />}>
            {user && (
              <>
                <NavDropdown.Header>{user.username}</NavDropdown.Header>
                <NavDropdown.Item onClick={() => auth.logout()}>
                  Logout
                </NavDropdown.Item>
              </>
            )}
            {!user && (
              <Link href="/login">
                <a className="dropdown-item">Login to upload your own photos</a>
              </Link>
            )}
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
