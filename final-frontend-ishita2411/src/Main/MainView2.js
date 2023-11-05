import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserPosts from "./UserPosts";
import UsersFriends from "./UsersFriends";
import UserStatus from "./UserStatus";
import "bootstrap/dist/css/bootstrap.min.css";
import UserName from "./UserName";

const MainView = () => {
  localStorage.setItem("newPostImage", "0");
  localStorage.setItem("loggedIn", true);

  //  const frnd = JSON.parse(localStorage.getItem("userFrnd"))
  //  console.log(frnd)
  // var frnd = null
  const [frnd, setfrnd] = useState(null);
  const [isPending, setIspending] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPosts] = useState(null);
  const a = localStorage.getItem("username");
  // const x = parseInt([localStorage.getItem("id")]);
  const [image, setImage] = useState("");
  const [frndID, setfrndID] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        fetch("http://localhost:3001/following", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          credentials: "include",
        }),
        fetch("http://localhost:3001/articles", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          credentials: "include",
        }),
      ])
        .then(([resUsers, resPosts]) =>
          Promise.all([resUsers.json(), resPosts.json()])
        )
        .then(([dataUsers, dataPosts]) => {
          var frnd1 = [];
          for (let i = 0; i < dataUsers.following.length; i++) {
            var x = {
              id: dataUsers.following[i]._id,
              friend: dataUsers.following[i].follower,
            };
            frnd1.push(x);
          }
          setfrnd(frnd1);

          const arti = dataPosts.articles;
          // console.log('setting posts', arti)

          setPosts(arti);
          setIspending(false);
        });
    }
    fetchData();
  }, []);

  const handleReset = (e) => {
    setTitle("");
    setBody("");
  };
  const handleOpenWidget = (e) => {
    e.preventDefault();
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dhkwgnwxj",
        uploadPreset: "zjarjpql",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImage(result.info.url);
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
        text: body,
        title: title,
        articleImage: image,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let posts_ = posts.slice();
        posts_.push(data.articles[0]);
        // posts.push(data.articles[0]);
        setPosts(posts_);
        setTitle("");
        setBody("");
        setInputText(" ");
        setInputText("");
      });
  };
  const [inputText, setInputText] = useState("");

  let inputHandler = (e) => {
    var lowerCase = e.target.value?.toLowerCase();
    setInputText(lowerCase);
  };

  const id = parseInt(localStorage.getItem("id"));

  const getData = (da) => {
    setfrndID(da);
  };

  useEffect(() => {}, [frndID]);

  return (
    <Container>
      <Navigation />
      <Row>
        <Col md={4}>
          <br></br>
          <h3>
            <UserName />
          </h3>
          <UserStatus />
        </Col>
        <Col md={3}>
          <br></br>
          <br></br>
          <br></br>
          <Form.Label>Select an image for new Post</Form.Label>
          <Button variant="dark" onClick={handleOpenWidget}>
            Upload Image{" "}
          </Button>
          {/* <Form.Control type="file" style={{ color: "black" }} /> */}
        </Col>
        <Col md={5}>
          <br></br>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Post Title</Form.Label>
              <Form.Control
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Post Body</Form.Label>
              <Form.Control
                type="textarea"
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </Form.Group>
            <Button variant="dark" onClick={handleSubmit}>
              Add New Post
            </Button>
            {"  "}
            <Button variant="dark" type="reset" onClick={handleReset}>
              Cancel Post
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col md={4}> </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              id="search"
              label="search"
              placeholder="filter"
              onChange={inputHandler}
              data-testid="search"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          {isPending && <div>Loading...</div>}

          {frnd && <UsersFriends frnd={frnd} onadd={getData} ondel={getData} />}
        </Col>

        <Col md={8}>
          {/* {isPostPending && <div>Loading...</div>} */}
          {isPending && <div>Loading...</div>}

          {posts && frndID && (
            <UserPosts po={posts} frndID={frndID} input={inputText} />
          )}

          {/* {posts && <UserPosts po = {posts} frndID= {frndID} input={inputText}/>} */}

          {/* {posts && <UserPosts posts = {posts.filter(foo)} input={inputText}/>} */}
          {/* {posts && <UserPosts posts = {posts.filter((post) =>parseInt(post.userId) === id )} input={inputText}/>} */}
        </Col>
      </Row>
    </Container>
  );
};

export default MainView;
