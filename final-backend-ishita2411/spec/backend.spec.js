require("es6-promise").polyfill();
require("isomorphic-fetch");

const url = (path) => `http://localhost:3000${path}`;
let cookie;
let cookie2;

describe("Testing", () => {
  it("register new user", (done) => {
    let regUser = {
      username: "testuser",
      password: "123",
      headline: "happy",
      email: "a@b.c",
      zipcode: "11111",
      dob: "01/01/2000",
    };
    fetch(url("/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regUser),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        expect(res.username).toEqual("testuser");
        expect(res.result).toEqual("success");
        done();
      });
  });

  it("login user", (done) => {
    let loginUser = {
      username: "testuser",
      password: "123",
    };
    fetch(url("/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginUser),
    })
      .then((res) => {
        cookie = res.headers.get("set-cookie");
        return res.json();
      })
      .then((res) => {
        expect(res.username).toEqual("testuser");
        expect(res.result).toEqual("success");
        done();
      });
  });

  it("get headline", (done) => {
    fetch(url("/headline"), {
      method: "GET",
      headers: { "Content-Type": "application/json", Cookie: cookie },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        expect(res.username).toEqual("testuser");
        expect(res.headline).toEqual("happy");
        done();
      });
  });

  it("update headline", (done) => {
    let headline = {
      headline: "new headline",
    };
    fetch(url("/headline"), {
      method: "PUT",
      headers: { "Content-Type": "application/json", Cookie: cookie },
      body: JSON.stringify(headline),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        expect(res.username).toEqual("testuser");
        expect(res.headline).toEqual("new headline");
        done();
      });
  });

  it("update headline", (done) => {
    let headline = {
      headline: "new headline",
    };
    fetch(url("/headline"), {
      method: "PUT",
      headers: { "Content-Type": "application/json", Cookie: cookie },
      body: JSON.stringify(headline),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        expect(res.username).toEqual("testuser");
        expect(res.headline).toEqual("new headline");
        done();
      });
  });

  it("post articles", (done) => {
    let newArticle = {
      text: "new article",
    };
    fetch(url("/article"), {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: cookie },
      body: JSON.stringify(newArticle),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        expect(res.article[0].text).toEqual("new article");
        done();
      });
  });

  it("get articles", (done) => {
    fetch(url("/articles"), {
      method: "GET",
      headers: { "Content-Type": "application/json", Cookie: cookie },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        expect(res.article[0].text).toEqual("new article");
        done();
      });
  });

  it("put articles", (done) => {
    let updateArticle = {
      text: "update article",
    };

    fetch(url("/articles/5"), {
      method: "PUT",
      headers: { "Content-Type": "application/json", Cookie: cookie },
      body: JSON.stringify(updateArticle),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        expect(res.article[0].text).toEqual("update article");
        done();
      });
  });

  it("logout", (done) => {
    fetch(url("/logout"), {
      method: "PUT",
      headers: { "Content-Type": "application/json", Cookie: cookie },
    })
      .then((res) => {
        cookie2 = res.headers.get("set-cookie");
        return res.json();
      })
      .then((res) => {
        expect(cookie).not.toEqual(cookie2);
        done();
      });
  });
});
