import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UserStatus = () => {
  var id = parseInt(localStorage.getItem("id"));
  const [status, setStatus] = useState("");
  const [statusText, setStatusText] = useState("");
  const [profileImage, setProfileImage] = useState("");
  async function fetchData() {
    await Promise.all([ 
      fetch("http://localhost:3001/headline", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      }),
      fetch("http://localhost:3001/avatar", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      }),
    ])
      .then(([resHeadline, resAvatar]) =>
        Promise.all([resHeadline.json(), resAvatar.json()])
      )
      .then(([dataHeadline, dataAvatar]) => {
        setStatus(dataHeadline.headline)
        setProfileImage(dataAvatar.avatar)
      });
  }
  fetchData();

  let handleStatus = () => {
    fetch("http://localhost:3001/headline", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        headline: statusText,
      }),
    }).then((response) => {
      setStatus(statusText);
      setStatusText("");
    });
  };

  return (
    <div className="userImage">
      <br></br>
      <img src={profileImage} alt="yoyo" width="150" height="150"></img>
      <br></br>
      Your Status: <Form.Label>{status}</Form.Label>
      <FloatingLabel
        controlId="floatingInput"
        label="New Status"
        className="mb-3"
      >
        <Form.Control
          type="text"
          required
          style={{ height: "40px", width: "300px" }}
          value={statusText}
          placeholder="New Status"
          onChange={(e) => setStatusText(e.target.value)}
        />
      </FloatingLabel>
      <Button onClick={handleStatus} variant="dark">
        Update Status
      </Button>
    </div>
  );
};

export default UserStatus;
