const fetch = require("node-fetch");

module.exports = {
  cookie: async function (username, password) {
    let springsecurity = "_spring_security_remember_me=true";
    let ret = await fetch("https://sciwheel.com/work/signinUser", {
      method: "POST",
      body: `j_username=${username}&j_password=${password}&${springsecurity}`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    let cookie = ret.headers.raw()["set-cookie"];
    return cookie;
  },

  tags: async function (cookie) {
    return await fetch("https://sciwheel.com/work/api/tag/list", {
      method: "get",
      headers: { cookie: cookie },
    }).then((res) => res.json());
  },

  ownedlist: async function (cookie) {
    return await fetch("https://sciwheel.com/work/api/collection/ownedList", {
      method: "get",
      headers: { cookie: cookie },
    }).then((res) => res.json());
  },

  references_page: async function (cookie, page) {
    return await fetch("https://sciwheel.com/work/api/search/items", {
      method: "POST",
      headers: { "Content-Type": "application/json", cookie: cookie },
      body: `{"page":${page},"show":"200","sortBy":["addedDate"]}`,
    }).then((res) => res.json());
  },

  references: async function (cookie) {
    let page_1 = await module.exports.references_page(cookie, 1);
    let totalpages = Math.ceil(page_1["totalHitCount"] / 200);
    let references = page_1["displayedItems"];
    let pages = [...Array(totalpages + 1).keys()].slice(2);
    pages = await Promise.all(
      pages.map(async (h) => {
        return await module.exports.references_page(cookie, h);
      })
    );
    pages.forEach((page) => references.push(...page["displayedItems"]));
    return references;
  },

  comments_page: async function (cookie, page) {
    return await fetch(
      `https://sciwheel.com/work/api/collection/558788/comments?query=&resultsPerPage=100&page=${page}&useAuthorsFromSolr=true`,
      {
        method: "get",
        headers: { cookie: cookie },
      }
    ).then((res) => res.json());
  },

  comments: async function (cookie) {
    let page_1 = await module.exports.comments_page(cookie, 1);
    let totalpages = Math.ceil(page_1["totalHitCount"] / 100);
    let comments = page_1["displayedItems"];
    let pages = [...Array(totalpages + 1).keys()].slice(2);
    pages = await Promise.all(
      pages.map(async (h) => {
        return await module.exports.comments_page(cookie, h);
      })
    );
    pages.forEach((page) => comments.push(...page["displayedItems"]));
    console.log(pages.length, comments.length);
    return comments;
  },
};
