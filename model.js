const { Sequelize, DataTypes, Model } = require("sequelize");

const { db: sequelize } = require("./database");
class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    sequelize, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name
    tableName: "users",
  }
);

module.exports = User;
// the defined model is the class itself
console.log(User === sequelize.models.User); // true
