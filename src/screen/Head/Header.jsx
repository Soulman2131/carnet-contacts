import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaUserPlus } from "react-icons/fa";
import { CiHome } from "react-icons/ci";
import logo from "../../assets/logo.png";

function Header() {
  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>
                <img src={logo} alt="logo de la boutique" />
                Le carnet des contacts
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basics-navbar-nav" />
            <Navbar.Collapse id="basics-navbar-nav">
              <Nav className="ms-auto">
                <LinkContainer to="/">
                  <Nav.Link>
                    <CiHome /> Accueil
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to="/add-contact">
                  <Nav.Link>
                    <FaUserPlus /> Ajouter
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

export default Header;
