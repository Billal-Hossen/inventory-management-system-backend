const Inventory = require("../models/inventory.model");

exports.createInventoryService = async (data) => {

  const inventory = await Inventory.create(data)

  return inventory;
}
exports.getInventoryService = async () => {

  const inventory = await Inventory.find({}).select('total_sale total_buy total_profit')
  return inventory;
}