// routes.js

const user = require("./controller");
module.exports = [
  {
    method: "GET",
    path: "/users",
    config: {
      handler: user.getAllusers,
      auth: "jwt",
      // auth: false,
    },
  },
  {
    method: "POST",
    path: "/user",
    config: { auth: false },
    handler: user.addUser,
  },
  {
    method: "PATCH",
    path: "/user/{_id}",
    config: {
      auth: "jwt",
    },
    handler: user.updateUser,
  },
  {
    method: "POST",
    path: "/user/login",
    config: { auth: false },
    handler: user.login,
  },
];
