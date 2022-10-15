const Product = require("../models/product.model")
const Inventory = require("../models/inventory.model")
exports.getProductService = async () => {

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
  const findProduct = await Product.findById({ _id: id })
  if (findProduct) {
    const result = await Product.deleteOne({ _id: id });
    if (!result.deletedCount) {
      res.status(400).json({
        success: false,
        message: "Couldn't deleted Successfully."
      })
    }
    const inventory = await Inventory.find({}).select('products').populate("products total_buy");
    console.log(id)
    const othersProduct = inventory[0].products.filter(prod => prod._id != id)
    console.log(othersProduct)

    // total Buy process
    const totalBuy = inventory[0]?.total_buy - (findProduct.buy_price *
      findProduct.current_quantity)
    console.log(totalBuy)

    await Inventory.updateOne({ _id: inventory[0]._id }, { products: othersProduct, total_buy: totalBuy })

    return result;
  }

}

