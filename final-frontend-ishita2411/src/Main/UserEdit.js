import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const UserEdits = ({ id , onEdit }) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [err, setErr] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (e) =>{
    e.preventDefault();
    fetch("http://localhost:3001/articles/"+id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        text: text,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.message){setErr(data.message)}
        else{
            onEdit(data);
            setShow(false)
        }
      })

  }

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Edit Text
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form.Label>New Text</Form.Label>
          <Form.Control
            type="text"
            onChange={handleTextChange}
            value={text}
            placeholder="New text"
          />
          <br></br>

          
          <p className="text-danger">{err}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" data-testid="login" onClick={handleEdit} >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserEdits;
