// routes.js

const user = require("./controller");
module.exports = [
  {
    method: "GET",
    path: "/users",
    handler: user.getAllusers,
  },
  {
    method: "POST",
    path: "/user",
    handler: user.addUser,
  },
  {
    method: "PATCH",
    path: "/user/{_id}",
    handler: user.updateUser,
  },
];
