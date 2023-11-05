import Navigation from "../Main/Navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

// import user from "../Main/user.webp";

const Profile = () => {
  const [userN, setUserN] = useState("");
  const [userP, setUserP] = useState("");
  const [userZ, setUserZ] = useState("");
  const [userE, setUserE] = useState("");
  const [userPWD, setUserPWD] = useState("*********************");
  const [userD, setUserD] = useState("")
  const [userI , setUserI] =useState("")

  const handleOpenWidget = (e) => {
    e.preventDefault();
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dhkwgnwxj",
        uploadPreset: "zjarjpql",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setUserI(result.info.url);
          fetch("http://localhost:3001/avatar", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        avatar: result.info.url
      }),
    })
          
        }
      }
    );
    myWidget.open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        // text: body,
        // title: title,
        // articleImage: image,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        
      });
  };

  useEffect(() =>{
    // console.log("in profile useEffect")
    fetch("http://localhost:3001/name", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        const profile = data.profile
        // console.log(profile)
        setUserN(profile.username)
        setUserE(profile.email)
        setUserZ(profile.zipcode)
        setUserP(profile.phone)
        setUserD(profile.dob)
        setUserI(profile.avatar)
      })
  },[])
  

  const [n, setn] = useState("");
  const [name, setName] = useState("");

  const [d, setd] = useState("");
  const [dob, setDob] = useState("");

  const [e, sete] = useState("");
  const [email, setEmail] = useState("");

  const [p, setp] = useState("");
  const [phone, setPhone] = useState("");

  const [z, setz] = useState("");
  const [zip, setZip] = useState("");

  const [pw, setpw] = useState("");
  const [pwd, setPwd] = useState("");

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


  function handleClick() {
    // localStorage.setItem("i", "0");

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


    if (dob !== "") {
      fetch("http://localhost:3001/dob", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({
          dob: dob
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)
          setUserD(data.dob)
        })
    }

    if (email !== "") {
      if (!/^\w+([\.-]?\w+)*@\w+([-]?\w+)*\.(\w{1,5})$/.test(email)) {
        sete("email should be of the form a@b.c");
      } else {
        fetch("http://localhost:3001/email", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({
          email:email
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)
          setUserE(data.email);
        })
        
      }
    }

    if (phone !== "") {
      if (!/[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(phone)) {
        setp("phone number should be of the form 123-123-1234");
      } else {
        fetch("http://localhost:3001/phone", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({
          phone:phone
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)
          setUserP(data.phone);
        })
        
        
      }
    }

    if (zip !== "") {
      if (!/[[0-9]{5}/.test(zip)) {
        setz("Zipcode can include only 5 numbers - eg. 11111");
      } else {
        fetch("http://localhost:3001/zipcode", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({
          zipcode:zip
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)
          setUserZ(data.zipcode);
        })
      }
    }

    if (pwd !== "") {
      if (
        !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          pwd
        )
      ) {
        setpw(
          "password should be minimum 8 characters\nit should be include atleast 1 Uppercase, 1 Lowercase, 1 number, 1 special character(@$!%*#?&)"
        );
        // localStorage.setItem("i", "0");
      } else {
        fetch("http://localhost:3001/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({
          password:pwd
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)
        })
        
      }
    }
  }
  return (
    <Container>
      <Navigation />
      <Row>
        <Col md={1}></Col>
        <Col md={4}>
        
          <br></br> <br></br>
          <img src={userI} alt="yoyo"  width="150" height="150"></img><br></br><br></br>
          <Button variant="dark" onClick={handleOpenWidget}>
            Upload Profile Picture
          </Button><br></br>
          <Form.Label>UserName:</Form.Label>
          <p>{userN}</p>
          <Form.Label>Date of birth:</Form.Label>
          <p>{userD}</p>
          <Form.Label>Email:</Form.Label>
          <p>{userE}</p>
          <Form.Label>Phone Number:</Form.Label>
          <p>{userP}</p>
          <Form.Label>Zipcode:</Form.Label>
          <p>{userZ}</p>
          <Form.Label>Password:</Form.Label>
          <p>{userPWD}</p>
        </Col>
        <Col md={2}></Col>
        <Col md={4}>
          <br></br>
          <br></br>
          <br></br>
          <Form.Label>Date of birth:</Form.Label>
          <br></br>

          <Form.Control
            type="date"
            placeholder="Enter account name"
            value={dob}
            onChange={changeDob}
          />
          {/* <p className="text-danger">{d}</p> */}

          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={changeEmail}
          />
          <p className="text-danger">{e}</p>

          <Form.Label>Phone Number:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={changePhone}
          />
          <p className="text-danger">{p}</p>

          <Form.Label>Zipcode:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter zipcode"
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

          <Button
            variant="dark"
            onClick={handleClick}
            data-testid="profileUpdateButton"
          >
            Submit
          </Button>
        </Col>
        <Col ms={1}></Col>
      </Row>
    </Container>
  );
};

export default Profile;
