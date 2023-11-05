import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import scene from "./scene.jpeg";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import UserEdit from "./UserEdit";
import Comments from "./Comments";

const UserPosts = ({ posts, onedit, input }) => {
  const [comments, setComments] = useState("");
  const [currentItems, setCurrentItems] = useState(null);

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;

  const onEdit = (d) =>{
    onedit(d)       
  }

  

  const filteredData = posts.filter((el) => {
    if (input === "") {
      return el;
    } else {
      return (
        el.text?.toLowerCase().includes(input) ||
        el.title?.toLowerCase().includes(input) ||
        el.author?.toLowerCase().includes(input)
      );
    }
  });
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredData.slice(itemOffset, endOffset));
    
    setPageCount(Math.ceil(filteredData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, posts, input]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredData.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <div className="post-list">
        <Row xs={1} md={2} className="g-4">
          {currentItems &&
            currentItems.map((postUser) => (
              <div className="post-preview" key={postUser.pid}>
                <Col>
                  <Card style={{ width: "24rem" }}>
                    {postUser.articleImage && (
                      <Card.Img
                        variant="top"
                        style={{ width: "24.75vw", height: "30vh" }}
                        src={postUser.articleImage}
                      />
                    )}
                    <Card.Body>
                      <Card.Title>{postUser.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Post written by: {postUser.author}
                      </Card.Subtitle>
                      <Card.Text>
                        {postUser.text}
                
                        <br></br>
                        Time posted: {JSON.stringify(postUser.date)}
                      </Card.Text>
                      <UserEdit id= {postUser.pid}  onEdit={onedit}/>
                      {"  "}
                      {/* <Button variant="dark" value={postUser.pid} data-toggle="modal" data-target="#exampleModal" onClick = {handleEdit}>Edit</Button> */}
                      <Comments comment= {postUser.comments} id = {postUser.pid} onEdit={onedit}/>
                      
                      {/* <Button
                        variant="dark"
                        value={postUser.pid}
                        onClick={handleComments}
                      >
                        Comments
                      </Button> */}
                      <Card.Text className={postUser.pid}>{comments}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </div>
            ))}
        </Row>
      </div>

      {/* <Items currentItems={currentItems} /> */}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="acive"
      />
    </div>
  );
};

export default UserPosts;
