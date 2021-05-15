const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const db = require("./database");
const validate = require("./is-auth").validate;
const secret = require("./config");

console.log(secret);

const init = async () => {
  console.log("validate", validate);
  const server = new Hapi.server({ port: 3000 });
  await server.register(require("hapi-auth-jwt2"));
  server.auth.strategy(
    "jwt",
    "jwt",
    {
      key: secret,
      validate,
    },
    (err) => {
      console.log(err);
    }
  );

  server.auth.default("jwt");

  server.route(routes);
  await server.start();
  return server;
};
init()
  .then((server) => {
    console.log("Server running at:", server.info.uri);
  })
  .catch((err) => {
    console.log(err);
  });
