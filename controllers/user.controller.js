
const { createUserService, signInService, getCustomerService, getSellersService, deleteSingleCustomerService, deleteSingleSellerService } = require("../services/user.services")
module.exports.createUserController = async (req, res) => {
  try {
    const result = await createUserService(req.body)

    if (result) {
      res.status(200).json({
        success: true,
        message: "Registation Successful.",

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

module.exports.getCustomerController = async (req, res) => {
  try {
    const customers = await getCustomerService()
    res.status(200).json({
      success: true,
      data: customers,

    })

  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Can't get customer data.",
      error: error.message


    })
  }
}
module.exports.getSellersController = async (req, res) => {
  try {
    const sellers = await getSellersService()
    res.status(200).json({
      success: true,
      data: sellers,

    })

  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Can't get sellers data.",
      error: error.message


    })
  }
}

exports.deleteSingleCustomerController = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await deleteSingleCustomerService(id);
    if (!customer.deletedCount) {
      res.status(400).json({
        success: false,
        message: "Couldn't deleted Successfully."
      })
    }
    res.status(200).json({
      success: true,
      message: "Deleted Successfully."
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Can't deleted product",
      error: error.message
    })
  }
}
exports.deleteSingleSellerController = async (req, res) => {
  try {
    const { id } = req.params;

    const seller = await deleteSingleSellerService(id);
    if (!seller.deletedCount) {
      res.status(400).json({
        success: false,
        message: "Couldn't deleted Successfully."
      })
    }
    res.status(200).json({
      success: true,
      message: "Deleted Successfully."
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Can't deleted product",
      error: error.message
    })
  }
}