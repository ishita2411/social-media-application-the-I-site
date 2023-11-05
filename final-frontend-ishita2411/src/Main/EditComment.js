import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

// import EditComment from "./EditComment";

const EditComment = ({commentid, id, onE}) => {
  
  const [text, setText] = useState("");
  const [err, setErr] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleEditComment = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/articles/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        text: text,
        commentId: commentid,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.message){setErr(data.message)}
        else{
            onE(data);
            setShow(false);
        }
        
      });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            onChange={handleTextChange}
            value={text}
            placeholder="Edit the comment"
          />

          <p className="text-danger">{err}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            data-testid="login"
            onClick={handleEditComment}
          >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditComment;
