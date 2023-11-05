import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  function handleLogout() {
    fetch("http://localhost:3001/logout", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.return == "OK") {
          navigate("/");
        }
      });
  }
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          THE{" "}
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          SITE
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Nav className="me-auto">
              <Link to="/main" style={{ textDecoration: "none" }}>
                Home{" "}
              </Link>
              {"  "}
              <Link
                to="/profile"
                style={{ textDecoration: "none", marginLeft: "8px" }}
              >
                Profile{" "}
              </Link>
              {"  "}
              <Link style={{ textDecoration: "none", marginLeft: "8px" }}  onClick={handleLogout}>
                {" "}
                Logout{" "}
              </Link>
            </Nav>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
