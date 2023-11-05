import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BrowserRouter as Router } from "react-router-dom";
import Profile from "./Profile";

localStorage.setItem("username", "Bret");
localStorage.setItem("phone", "123-123-1234");
localStorage.setItem("zip", "11111");
localStorage.setItem("email", "a@b.c");
localStorage.setItem("pwd", "Ishita@24");

describe("Profile Test", () => {
  render(
    <Router>
      <Profile />
    </Router>
  );

  const update = screen.getByTestId("profileUpdateButton");

  test("Fetch profile user name", () => {
    const uname = localStorage.getItem("username");

    expect(uname).toBe("Bret");
  });
});
