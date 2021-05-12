const { User } = require("./model");

exports.getAllusers = async (req, res) => {
  const users = await User.find();
  return res.response({ users });
};

exports.addUser = async (req, res) => {
  console.log("requset's body", req.payload);
  const NewUser = new User({
    name: req.payload.name,
    email: req.payload.email,
    age: req.payload.age,
    gender: req.payload.gender,
  });
  const user = await NewUser.save();
  return res.response(user).code(202);
};

exports.updateUser = async (req, res) => {
  const id = req.params._id;
  const user = await User.findById(id);
  if (!user) {
    return res.response({ msg: "user is not found" }).code(400);
  }
  user.name = req.payload.name;
  user.email = req.payload.email;
  user.age = req.payload.age;
  user.gender = req.payload.gender;

  await user.save();
  return res.response({ msg: "User is Updated", user }).code(200);
};
