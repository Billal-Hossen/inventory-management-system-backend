
const { getProductService,
  createProductService,
  deleteSingleProductService,
} = require("../services/product.service");


// Get all Product Controller
module.exports.getAllProducts = async (req, res) => {
  console.log(req.query)
  try {
    // Filter part start
    let filters = { ...req.query }
    // const excludeFields = []
    // for (property in filters) {
    //   if (property !== "status") {
    //     excludeFields.push(property)
    //   }
    // }
    // excludeFields.forEach(field => delete filters[field])
    // console.log(filters)
    const excludeFields = ["sort", "limit", "page"]
    excludeFields.forEach(field => delete filters[field])
    let filterString = JSON.stringify(filters)
    filterString = filterString.replace(/\b(gt|lt|gte|lte)\b/g, match => `$${match}`)
    filters = JSON.parse(filterString)

    // Filter part end
    const queries = {}
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ')
      queries.sortBy = sortBy;
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ')
      queries.fields = fields;
    }
    if (req.query.page) {
      const { page = 1, limit = 2 } = req.query;

      const skip = (+page - 1) * (+limit)
      queries.skip = skip
      queries.limit = (+limit)
    }
    console.log(queries)

    const products = await getProductService(filters, queries)
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




