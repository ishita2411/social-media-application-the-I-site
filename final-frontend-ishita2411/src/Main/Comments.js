import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import EditComment from "./EditComment";

  

const Comments = ({ comment, id, onEdit}) => {
    
    const [text, setText] = useState("");
//   const [err, setErr] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
    
  };

  const onE = (d) =>{
    onEdit(d)       
  }
  const handleNewComment =(e) =>{
    e.preventDefault();
    // "/articles/:id"
    console.log(text)
    fetch("http://localhost:3001/articles/"+id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        text: text,
        commentId : -1
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        onEdit(data);
        setShow(false)
      })

  }
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Comments
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {comment &&
            comment.map((comment) => (
              <div className="post-preview" key={comment.id}>
                <Col>
                  <Card style={{ width: "24rem" }}>
                    <Card.Body>                    
                      <Card.Text>                     
                      {comment.commentid}. {comment.comment}{'    '}-{comment.username}
                      <br/>
                      <EditComment commentid={comment.commentid} id={id} onE = {onEdit}/>
                      
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </div>
            ))}          

        </Modal.Body>
        <Modal.Footer>
        <Form.Control
            type="text"
            onChange={handleTextChange}
            value={text}
            placeholder="Write new Comment"
          />
          
          {/* <Button variant="dark"> */}
            <Button variant="dark"  onClick={handleNewComment} >
            Add new Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Comments;
