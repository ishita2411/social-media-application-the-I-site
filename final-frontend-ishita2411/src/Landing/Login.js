import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";

const Login = () => {
  const [err, setErr] = useState("");


  const [uname, setuname] = useState("");
  const [pwd, setPwd] = useState("");

  const handlePChange = (event) => {
    setPwd(event.target.value);
  };

  const handleChange = (event) => {
    setuname(event.target.value);
  };

  const navigate = useNavigate();
  function handleClick() {
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        username: uname,
        password: pwd,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result == "success") {
          
          let f = [];
          for (let i = 0; i < data.following.length; i++) {
            let foll = {
              id: i,
              friend: data.following[i],
            };
            f.push(foll);
          }

          navigate("/main");
        } else {
          setErr("invalid login credentials");
        }
      });

    
  }

  return (
    <Container>
      <Form.Label>User Name</Form.Label>
      <Form.Control
        type="text"
        id="uname"
        name="uname"
        onChange={handleChange}
        value={uname}
        placeholder="Username"
      />

      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        onChange={handlePChange}
        value={pwd}
        placeholder="Password"
      />
      <br></br>

      <Button variant="dark" data-testid="login" onClick={handleClick}>
        Submit
      </Button>
      <br></br>
      <p className="text-danger">{err}</p>
    </Container>
  );
};

export default Login;
