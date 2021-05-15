const User = require("./model");
const db = require("./database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getAllusers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.response({ users }).code(200);
  } catch (err) {
    console.log("hey error is  running");
    console.log(err);
    return res.response({ err: err.msg }).code(500);
  }
};

exports.addUser = async (req, res) => {
  try {
    const email = req.payload.email;
    const name = req.payload.name;
    const password = req.payload.password;

    console.log("requset's body", req.payload);
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return res.response({ msg: "user is already present" }).code(422);
    }
    const hashedPw = await bcrypt.hash(password, 12);
    const NewUser = await User.create({
      name: name,
      email: email,
      password: hashedPw,
    });
    console.log("NewUser:", NewUser);
    return res.response(NewUser).code(201);
  } catch (err) {
    console.log(err);
    return res.response({ message: err.msg }).code(500);
  }
};

exports.login = async (req, res) => {
  try {
    const email = req.payload.email;
    const password = req.payload.password;

    let loadedUser = await User.findOne({ where: { email: email } });

    if (!loadedUser) {
      return res
        .response({ msg: "Email or password is not found !" })
        .code(422);
    }

    const isEqual = bcrypt.compare(password, loadedUser.password);

    if (!isEqual) {
      return res
        .response({ msg: "Email or password is not found !" })
        .code(422);
    }

    const token = jwt.sign(
      {
        email: loadedUser.email,
        name: loadedUser.name,
        userId: loadedUser.id,
      },
      "someLongSecret",
      { algorithm: "HS256", expiresIn: "1h" }
    );

    return res.response({ token: token, userId: loadedUser.id });
  } catch (err) {
    console.log(err);
    return res.response({ err: err.message }).code(500);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params._id;
    const user = await User.findOne({ where: { id: id } });
    // console.log("user", user);
    if (!user) {
      return res.response({ msg: "user is not found" }).code(400);
    }
    if (req.user.userId !== user.id) {
      return res.response({ msg: "Not authorized!" }).code(422);
    }
    const newData = {
      name: req.payload.name,
      email: req.payload.email,
    };

    await User.update(newData, { where: { id: id } });
    return res
      .response({
        msg: "User is Updated",
        updatedUser: { name: req.payload.name, email: req.payload.email },
      })
      .code(200);
  } catch (err) {
    console.log(err);
    return res.response({ err: err.message }).code(500);
  }
};
