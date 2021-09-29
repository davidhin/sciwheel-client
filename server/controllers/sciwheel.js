const fetch = require("node-fetch");

module.exports = {
  cookie: async function (username, password) {
    springsecurity = "_spring_security_remember_me=true";
    ret = await fetch("https://sciwheel.com/work/signinUser", {
      method: "POST",
      body: `j_username=${username}&j_password=${password}&${springsecurity}`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    cookie = ret.headers.raw()["set-cookie"];
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
    page_1 = await module.exports.references_page(cookie, 1);
    totalpages = Math.ceil(page_1["totalHitCount"] / 200);
    references = page_1["displayedItems"];
    pages = [...Array(totalpages + 1).keys()].slice(2);
    pages = await Promise.all(
      pages.map(async (h) => {
        return await module.exports.references_page(cookie, h);
      })
    );
    pages.forEach((page) => references.push(...page["displayedItems"]));
    return references;
  },
};
