const jwt = require("jsonwebtoken");
const secret = require("./config");

console.log("hey i am running.");

const validate = async (artifacts, req, res) => {
  try {
    // console.log(req);
    // console.log("decoded artifacts", artifacts);
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      // res.response({ message: "Not Authenticated." }).code(400);
      return {
        isValid: false,
        credentials: { user: artifacts },
      };
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, secret);
    } catch (error) {
      // res.response({ message: error.message }).code(422);
      return { isValid: false };
    }
    if (!decodedToken) {
      // res.response({ message: "Not autherized." }).code(401);
      return { isValid: false };
    }
    req.user = decodedToken;
    // return res.response(req.user.decodedToken);
    return { isValid: true };
  } catch (error) {
    console.log("err", error);
  }
};

module.exports = {
  validate,
};
