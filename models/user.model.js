const { Schema, model } = require("mongoose");
const jwt = require('jsonwebtoken');
const validator = require('validator');
const userSchema = Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
    minLength: [3, "User name at least 3 charater."],
    maxLength: [100, "User name is too long."],
    trim: true
  },

  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Please provide email."],
    validate: [validator.isEmail, "Please provide a valiad email."],
    maxLength: [100, "User email is too long."],
  },
  password: {
    type: String,
    required: [true, "User password is required"],
    minLength: [3, "User password at least 3 charater."],
    maxLength: [100, "User  is too long."],
    trim: true
  },
  roles: {
    type: String,
    enum: ['customer', 'admin', 'seller'],
    default: 'customer'
  },

}, { timestamps: true })


userSchema.methods.generateJWT = function () {
  const token = jwt.sign({
    _id: this._id,
    name: this.name,
    email: this.email,
    roles: this.roles,


  }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
  return token;
}

// Modle
const User = model("User", userSchema)

module.exports = User;