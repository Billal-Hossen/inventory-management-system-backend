const Inventory = require("../models/inventory.model");
const Product = require("../models/product.model");

exports.createInventoryService = async (data) => {

  const inventory = await Inventory.create(data)

  return inventory;
}
exports.getInventoryService = async () => {

  const inventory = await Inventory.find({}).select('total_sale total_buy total_profit');
  let bestSaleProduct = await Product.find({}).sort('-sellCount');
  bestSaleProduct = bestSaleProduct[0]

  return { inventory, bestSaleProduct };
}