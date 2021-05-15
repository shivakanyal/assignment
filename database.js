const { Sequelize } = require("sequelize");
const db = new Sequelize("User", "postgres", "Shiva@123", {
  host: "localhost",
  dialect: "postgres",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

db.authenticate()
  .then(() => console.log("database is connected."))
  .catch((err) => console.log(err));

module.exports = { db };
