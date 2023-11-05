import { useEffect, useState } from "react";

const UserName = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/name", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setName(data.username));
  }, []);

  return (
    <div>
      <h3>Welcome {name}</h3>
    </div>
  );
};

export default UserName;
