import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import scene from "./scene.jpeg";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const UserPosts = ({ po, frndID, input }) => {
  const u = localStorage.getItem("username");
  const [comments, setComments] = useState("");
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;

  const posts = po.filter((a) => {
    for (let i = 0; i < frndID.length; i++) {
      if (a.author == frndID[i].friend || a.author == u) {
        return a;
      }
    }
    if (a.author == u) {
      return a;
    }
  });

  function custom_sort(a, b) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }
  posts.sort(custom_sort);

  const uname = localStorage.getItem("username");
  // const [filteredData, setFilteredData] = useState([])

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
    // console.log('current items', currentItems);
    setPageCount(Math.ceil(filteredData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, po, frndID, input]);
  // [itemOffset,itemsPerPage,filteredData]
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredData.length;
    setItemOffset(newOffset);
  };

  // useEffect(() => {
  //   if (input.length > 0) {
  //     const searched = filteredData;
  //     localStorage.setItem("matching_matching", searched.length);
  //   }
  // }, [input]);

  const handleComments = (e) => {
    e.preventDefault();
    if (comments === "") {
      setComments("Comments: - Wonderful post");
    } else {
      setComments("");
    }
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
                      <Button variant="dark">Edit</Button>
                      {"  "}
                      <Button
                        variant="dark"
                        value={postUser.pid}
                        onClick={handleComments}
                      >
                        Show/ Hide Comments
                      </Button>
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
