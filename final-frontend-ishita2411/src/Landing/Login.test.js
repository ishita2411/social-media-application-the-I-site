import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import Navigation from "../Main/Navigation";

var a = "asdf";

const users_dum = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: {
        lat: "-43.9509",
        lng: "-34.4618",
      },
    },
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains",
    },
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    address: {
      street: "Douglas Extension",
      suite: "Suite 847",
      city: "McKenziehaven",
      zipcode: "59590-4157",
      geo: {
        lat: "-68.6102",
        lng: "-47.0653",
      },
    },
    phone: "1-463-123-4447",
    website: "ramiro.info",
    company: {
      name: "Romaguera-Jacobson",
      catchPhrase: "Face to face bifurcated interface",
      bs: "e-enable strategic applications",
    },
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
    address: {
      street: "Hoeger Mall",
      suite: "Apt. 692",
      city: "South Elvis",
      zipcode: "53919-4257",
      geo: {
        lat: "29.4572",
        lng: "-164.2990",
      },
    },
    phone: "493-170-9623 x156",
    website: "kale.biz",
    company: {
      name: "Robel-Corkery",
      catchPhrase: "Multi-tiered zero tolerance productivity",
      bs: "transition cutting-edge web services",
    },
  },
];
localStorage.setItem("userList", JSON.stringify(users_dum));

describe("Validate Authentication", () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  const username = screen.getByPlaceholderText("Username");
  const password = screen.getByPlaceholderText("Password");
  const signin = screen.getByTestId("login");

  test("Previous user Login", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(username, {
      target: {
        value: "Bret",
      },
    });

    fireEvent.change(password, {
      target: {
        value: "Kulas Light",
      },
    });

    fireEvent.click(signin);
    const loggedIn = localStorage.getItem("loggedIn");
    localStorage.setItem("id", 0);
    localStorage.setItem("username", username);
    localStorage.setItem("phone", users_dum[0].phone);
    localStorage.setItem("zip", users_dum[0].address.zipcode);
    localStorage.setItem("pwd", password);
    localStorage.setItem("email", users_dum[0].email);

    expect(loggedIn).toBe("true");
  });

  test("should not log in any invalid user", () => {
    localStorage.setItem("loggedIn", "false");
    fireEvent.change(username, {
      target: {
        value: "Ish",
      },
    });

    fireEvent.change(password, {
      target: {
        value: "Bissonnet",
      },
    });

    fireEvent.click(signin);
    const loggedIn = localStorage.getItem("loggedIn");

    expect(loggedIn).toBe("false");
  });

  test("logout test", () => {
    render(
      <Router>
        <Navigation />
      </Router>
    );
    const logout = screen.getByTestId("logoutLink");
    fireEvent.click(logout);

    const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
    expect(loggedIn).toBeFalsy;
  });
});
