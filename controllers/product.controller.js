
const { getProductService,
  createProductService,
  deleteSingleProductService,
} = require("../services/product.service");


// Get all Product Controller
module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await getProductService()
    res.status(200).json({
      success: true,
      data: products,

    })
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Can't get data",
      error: error.message


    })
  }
}


// Create Product Controller
module.exports.createProduct = async (req, res, next) => {


  try {
    req.body.created_by = await req.user._id;
    const result = await createProductService(req.body)


    if (result) {
      res.status(200).json({
        success: true,
        message: "Created product Successfully.",
        data: result
      })
    } else {
      res.status(401).json({
        success: false,
        message: "Not created product Successfully.",

      })
    }


  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Not created product Successfully.",
      error: error.message
    })
  }

}


// Delete  Product  By Id Controller

exports.deleteSingleProductController = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await deleteSingleProductService(id,);
    if (!product.deletedCount) {
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




