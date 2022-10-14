const User = require("../models/user.model")
const bcrypt = require('bcrypt');

module.exports.createUserService = async (data) => {

  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);
  const newUser = await User.create(data);
  const token = newUser.generateJWT();
  return token;

}
module.exports.signInService = async (data) => {

  let user = await User.findOne({ email: data.email });
  if (!user) {
    return res.status(400).send("Invalied email or password")
  }

  const validUser = await bcrypt.compare(data.password, user.password);
  if (!validUser) {
    return res.status(400).send("Invalied email or password")
  }

  const token = user.generateJWT();
  return token;

}

module.exports.getCustomerService = async () => {
  const result = await User.find({ roles: "customer" }).select("-password")
  return result;
}
module.exports.getSellersService = async () => {
  const result = await User.find({ roles: "seller" }).select("-password")
  return result;
}

exports.deleteSingleCustomerService = async (id) => {

  const result = await User.deleteOne({ _id: id });
  return result;
}
exports.deleteSingleSellerService = async (id) => {

  const result = await User.deleteOne({ _id: id });
  return result;
}