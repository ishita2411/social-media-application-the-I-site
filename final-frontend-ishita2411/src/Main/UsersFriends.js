import { useEffect, useState } from "react";
import friends from "./friends.jpeg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const UsersFriends = ({ frnd, onadd, ondel }) => {

  const [friend, setFriend] = useState(frnd);
  const [addFriend, setAddFriend] = useState("");
  const [kuchToh, setKuchToh] = useState("");

  const handleFriend = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/following/" + addFriend, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          const msg = data.message;
          setKuchToh(msg);
        } else {
          setKuchToh("");
          setAddFriend("");
          frnd = [];
          for (let i = 0; i < data.following.length; i++) {
            var x = {
              id: data.following[i]._id,
              friend: data.following[i].follower,
            };
            frnd.push(x);
          }
          setFriend(frnd);
          onadd(friend);
        }
      });
  };
  const handleUnfollow = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/following/" + e.target.value, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        frnd = [];
        for (let i = 0; i < data.following.length; i++) {
          var x = {
            id: data.following[i]._id,
            friend: data.following[i].follower,
          };
          frnd.push(x);
        }
        setFriend(frnd);
      });
  };
  let changeHandler = (e) => {
    setAddFriend(e.target.value);
  };

  useEffect(() => {
    ondel(friend);
  }, [friend]);
  return (
    <div>
      <h3>Your Followers</h3>
      {friend.map((friend) => (
        <div key={friend.id}>
          <img src={friends} alt="frnd" width="170" height="170"></img>
          <br></br>
          <br></br>
          {friend.friend}
          <br></br>
          <Button
            variant="dark"
            size="sm"
            data-testid={"unfollowButton_" + friend["id"].toString()}
            value={friend.id}
            onClick={(e) => handleUnfollow(e)}
          >
            Unfollow
          </Button>{" "}
          <br></br> <br></br>
        </div>
      ))}
      <Form.Control
        type="text"
        required
        style={{ height: "40px", width: "300px" }}
        value={addFriend}
        onChange={changeHandler}
        placeholder="Enter new followers name"
      />
      <br></br>
      <p className="text-danger">{kuchToh}</p> <br></br>
      <Button
        variant="dark"
        data-testid="followNameButton"
        onClick={handleFriend}
      >
        Add new friend
      </Button>
    </div>
  );
};

export default UsersFriends;
