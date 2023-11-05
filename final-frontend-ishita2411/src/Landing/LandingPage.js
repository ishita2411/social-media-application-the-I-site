import Login from "./Login";
import Register from "./Register";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar1 from "./NavBar1";
import { Button } from "react-bootstrap";

const LandingPage = () => {
  // const [posts,setPosts] = useState(null);

  const handleClick = (e) => {
    window.location = "http://localhost:3001/auth/google";
  };

  return (
    <Container>
      <NavBar1 />
      <Row>
        <Col md={1}></Col>
        <Col md={4}>
          {" "}
          <h3>
            Are you a new user??<br></br>
            Please Register
          </h3>
          <br></br>
          <Register />
        </Col>
        <Col md={2}></Col>
        <Col md={4}>
          <h3>Login</h3>
          <Login />
          <Button variant="dark" onClick={handleClick}>Sign in with google...</Button>
        </Col>

        <Col md={1}></Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
