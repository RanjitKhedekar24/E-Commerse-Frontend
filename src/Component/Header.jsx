import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useAuth } from "../context/auth";
import { NavDropdown } from "react-bootstrap";
import { Adminmenu } from "../Admin/Adminmenu";
import { useCart } from "../context/Cart";

export const Header = () => {
  const { auth, setAuth } = useAuth();
  const cart = useCart();

  const handleSignOut = () => {
    localStorage.removeItem("auth");
    setAuth({ user: null, token: "" });
  };

  const isAdmin = auth?.user?.role === "1";

  return (
    <Navbar bg="primary" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="cursor-pointer">
          Online Shopping
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/" end className="nav-link">
              Home
            </NavLink>

            {/* Admin Panel - Only for admins */}
            {isAdmin && (
              <NavDropdown title="Admin Panel" id="admin-nav-dropdown">
                <Adminmenu />
              </NavDropdown>
            )}

            {/* If no user is logged in */}
            {!auth.user && (
              <NavLink to="/SignIn" className="nav-link">
                SignIn
              </NavLink>
            )}

            {/* If user is logged in */}
            {auth.user && (
              <NavDropdown title={auth.user.name} id="basic-nav-dropdown">
                <NavDropdown.Item
                  as={NavLink}
                  to={`/dashboard/${isAdmin ? "admin" : "user"}`}
                >
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/SignIn"
                  onClick={handleSignOut}
                >
                  SignOut
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <NavLink to="/cartitems" className="nav-link">
              <FaCartShopping />
              <sup>{cart.lenght}</sup>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
