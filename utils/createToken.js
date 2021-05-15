const jwt = require("jsonwebtoken");
const secret = require("../config");
exports.createToken = (name, email, userId) => {
  const token = jwt.sign(
    {
      email: email,
      name: name,
      userId: userId,
    },
    secret,
    { algorithm: "HS256", expiresIn: "1h" }
  );
  return token;
};
