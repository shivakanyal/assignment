const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const db = require("./database").db;

const server = Hapi.server({
  port: 3000,
  host: "localhost",
});

server.start();
console.log("Server running on %s", server.info.uri);

server.route(routes);
