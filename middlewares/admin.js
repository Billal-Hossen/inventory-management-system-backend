const req = require("express/lib/request")

module.exports = function (req, res, next) {
  if (req.user.roles !== "admin") {
    return res.status(403).send("Forbidden!")

  }
  next();
}