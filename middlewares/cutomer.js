module.exports.Customer = function (req, res, next) {
  if (req.user.roles !== "customer") {
    return res.status(403).send("Forbidden!")

  }
  next();
}