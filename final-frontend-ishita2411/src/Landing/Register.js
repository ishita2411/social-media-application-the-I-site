import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";

import Axios from "axios";

const Register = () => {
  const [regis, setRegis] = useState("");

  const [n, setn] = useState("");
  const [name, setName] = useState("");

  const [e, sete] = useState("");
  const [email, setEmail] = useState("");

  const [p, setp] = useState("");
  const [phone, setPhone] = useState("");

  const [z, setz] = useState("");
  const [zip, setZip] = useState("");

  const [pw, setpw] = useState("");
  const [pwd, setPwd] = useState("");

  const [d, setd] = useState("");
  const [dob, setDob] = useState("");

  const [pwc, setpwc] = useState("");
  const [pwdConf, setPwdConf] = useState("");

  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeDob = (e) => {
    setDob(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePhone = (e) => {
    setPhone(e.target.value);
  };

  const changeZip = (e) => {
    setZip(e.target.value);
  };

  const changePwd = (e) => {
    setPwd(e.target.value);
  };

  const changePwdConf = (e) => {
    setPwdConf(e.target.value);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("i", "0");
    setn("");
    setName("");
    setd("");
    setDob("");
    sete("");
    setEmail("");
    setp("");
    setPhone("");
    setz("");
    setZip("");
    setpw("");
    setPwd("");
    setpwc("");
    setPwdConf("");

    if (name === "") {
      setn("field cannot be is empty");
      localStorage.setItem("i", "1");
    } else if (!/^[A-Za-z][a-zA-Z0-9]*/.test(name)) {
      setn(
        "Account name can only have letters and numbers. It should start with a letter"
      );
      localStorage.setItem("i", "1");
    }

    if (dob === "") {
      setd("field cannot be is empty");
      localStorage.setItem("i", "1");
    }

    if (email === "") {
      sete("field cannot be is empty");
      localStorage.setItem("i", "1");
    } else if (!/^\w+([\.-]?\w+)*@\w+([-]?\w+)*\.(\w{1,5})$/.test(email)) {
      sete("email should be of the form a@b.c");
      localStorage.setItem("i", "1");
    }

    if (phone === "") {
      setp("field cannot be is empty");
      localStorage.setItem("i", "1");
    } else if (!/[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(phone)) {
      setp("phone number should be of the form 123-123-1234");
      localStorage.setItem("i", "1");
    }

    if (zip === "") {
      setz("field cannot be is empty");
      localStorage.setItem("i", "1");
    } else if (!/[[0-9]{5}/.test(zip)) {
      setz("Zipcode can include only 5 numbers - eg. 11111");
      localStorage.setItem("i", "1");
    }

    if (pwd === "") {
      setpw("field cannot be is empty");
      localStorage.setItem("i", "1");
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        pwd
      )
    ) {
      setpw(
        "password should be minimum 8 characters\nit should be include atleast 1 Uppercase, 1 Lowercase, 1 number, 1 special character(@$!%*#?&)"
      );
      localStorage.setItem("i", "1");
    }

    if (pwdConf === "") {
      setpwc("field cannot be is empty");
      localStorage.setItem("i", "1");
    } else if (pwdConf !== pwd) {
      setpwc("password and password confirmation values should be same");
      localStorage.setItem("i", "1");
    }

    if (localStorage.getItem("i") === "0") {
      // localStorage.setItem("username", name);
      // localStorage.setItem("userFrnd", JSON.stringify([]));
      // localStorage.setItem("id", 100);
      // localStorage.setItem("phone", phone);
      // localStorage.setItem("zip", zip);
      // localStorage.setItem("pwd", pwd);
      // localStorage.setItem("email", email);
      // localStorage.setItem("id", 100);
      // localStorage.setItem("reg", 1);
      Axios.post("http://localhost:3001/register", {
        username: name,
        password: pwd,
        email: email,
        zipcode: zip,
        dob: dob,
        phone:phone
      }).then((response) => {
        if (response.data == "Cannot register since user already present") {
          setpwc("Cannot register since user already present");
        } else {
          setRegis("Successfully registered. Login -->");
        }
      });
    }
  };

  return (
    <Container>
      <Form>
        <p>{regis}</p>
        <Form.Label>Account Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter account name"
          value={name}
          onChange={changeName}
        />
        <p className="text-danger">{n}</p>

        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter display name"
          value={dob}
          onChange={changeDob}
        />
        <p className="text-danger">{d}</p>

        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter account name"
          value={email}
          onChange={changeEmail}
        />
        <p className="text-danger">{e}</p>

        <Form.Label>Phone Number:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter account name"
          value={phone}
          onChange={changePhone}
        />
        <p className="text-danger">{p}</p>

        <Form.Label>Zipcode:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter account name"
          value={zip}
          onChange={changeZip}
        />
        <p className="text-danger">{z}</p>

        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={pwd}
          onChange={changePwd}
        />
        <p className="text-danger">{pw}</p>

        <Form.Label>Password Confirmation:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={pwdConf}
          onChange={changePwdConf}
        />
        <p className="text-danger">{pwc}</p>

        <Button variant="dark" onClick={handleClick}>
          Submit
        </Button>
      </Form>
    </Container>

    
  );
};
          
                  

export default Register;
