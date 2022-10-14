const Product = require("../models/product.model")
const Inventory = require("../models/inventory.model")
exports.getProductService = async (filters, queries) => {

  const products = await Product.find({})
  return products;
}
exports.createProductService = async (data) => {

  const product = await Product.create(data);
  const { _id: productId, buy_price, buy_quantity } = product;
  //update Brand
  const inventory = await Inventory.find({})

  const res = await Inventory.updateOne(
    { _id: inventory[0]._id },
    { $push: { products: productId } },
  )
  const totalBuy = inventory[0]?.total_buy + (buy_price *
    buy_quantity)
  const updateAgin = await Inventory.updateOne(
    { _id: inventory[0]._id },
    {
      total_buy: totalBuy
    },
  )
  console.log(res)
  return product;
}

exports.deleteSingleProductService = async (id) => {

  const result = await Product.deleteOne({ _id: id });
  return result;
}

