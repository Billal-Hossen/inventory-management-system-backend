
const { createUserService, signInService } = require("../services/user.services")
module.exports.createUserController = async (req, res) => {
  try {
    const result = await createUserService(req.body)

    if (result) {
      res.status(200).json({
        success: true,
        message: "Registation Successful.",
        data: result
      })
    } else {
      res.status(400).json({
        success: false,
        message: "Couldn't created new user."
      })
    }

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Couldn't created new user.",
      error: error.message
    })
  }
}

module.exports.signInController = async (req, res) => {
  try {
    const result = await signInService(req.body)

    if (result) {
      res.status(200).json({
        success: true,
        message: "Login Successful.",
        data: result
      })
    } else {
      res.status(400).json({
        success: false,
        message: "Couldn't Login Successful."
      })
    }

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Couldn't Login Successful.",
      error: error.message
    })
  }
}