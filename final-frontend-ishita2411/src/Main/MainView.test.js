import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BrowserRouter as Router, Route } from "react-router-dom";
import UserPosts from "./UserPosts";
import MainView from "./MainView";
import { useState } from "react";
import { all_posts } from "../posts";
import { all_users } from "../users";
import UserFriends from "./UsersFriends";

// let inputText = screen.getByTestId("search");

const users = all_users;
const posts = all_posts;
const frndID = [1, 2, 3, 4];
var prev_post;
var after_deletion;
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
localStorage.setItem("userList", JSON.stringify(all_users));

describe("user posts generated", () => {
  localStorage.setItem(
    "userFrnd",
    JSON.stringify([
      { id: 0, friend: "Antonette", uid: 2 },
      { id: 1, friend: "Samantha", uid: 3 },
      { id: 2, friend: "Karianne", uid: 4 },
    ])
  );
  localStorage.setItem("all_posts", JSON.stringify(posts));
  localStorage.setItem("username", "Bret");
  localStorage.setItem("id", 1);

  render(
    <Router>
      <MainView />
    </Router>
  );

  test("user posts", () => {
    const shownPosts = JSON.parse(localStorage.getItem("initial_posts"));
    var trueShownPost = [];
    frndID.forEach((friend_id) => {
      var each_user_post = posts.filter(function (post) {
        return post.userId === friend_id;
      });
      trueShownPost = trueShownPost.concat(each_user_post);
    });

    prev_post = trueShownPost;
    expect(shownPosts.length).toBe(trueShownPost.length);
  });

  test("posts search", () => {
    render(
      <Router>
        <MainView />
      </Router>
    );
    const inputText = screen.getByPlaceholderText("filter");
    var keyword = "Samantha";
    var id = 3;
    fireEvent.change(inputText, {
      target: {
        value: "Samantha",
      },
    });

    const searched_posts = JSON.parse(
      localStorage.getItem("matching_matching")
    );

    prev_post.forEach((post) => {
      var author = all_users[post["userId"] - 1]["username"];
      post["name"] = author;
    });

    var matching_posts = 0;

    prev_post.forEach((post) => {
      if (post["name"].match(keyword) || post["body"].match(keyword))
        matching_posts++;
    });

    expect(matching_posts.length).toBe(searched_posts.length);
  });

  test("delete friend and posts", () => {
    render(
      <Router>
        <MainView />
      </Router>
    );

    const unfollowButton = screen.getByTestId("unfollowButton_1");
    fireEvent.click(unfollowButton);

    const mod_posts = JSON.parse(localStorage.getItem("initial_posts"));
    after_deletion = mod_posts.length;

    expect(mod_posts.length).toBeLessThan(prev_post.length);
  });

  test("add friend and posts", () => {
    render(
      <Router>
        <MainView />
      </Router>
    );

    const followName = screen.getByPlaceholderText("Enter new followers name");
    const followNameButton = screen.getByTestId("followNameButton");

    fireEvent.change(followName, {
      target: {
        value: "Leopoldo_Corkery",
      },
    });
    fireEvent.click(followNameButton);
    const mod_posts = JSON.parse(localStorage.getItem("initial_posts"));
    expect(after_deletion).toBeLessThan(mod_posts.length);
  });
});
