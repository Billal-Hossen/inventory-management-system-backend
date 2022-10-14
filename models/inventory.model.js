const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types
const inventorySchema = Schema({
  products: [{
    type: ObjectId,
    ref: "Product"
  }],

  total_sale: {
    type: Number,
    default: 0,
    min: 0
  },
  total_buy: {
    type: Number,
    default: 0,
    min: 0
  },
  total_profit: {
    type: Number,
    default: 0,
    min: 0
  },
  sellCount: {
    type: Number,
    default: 0,
    min: 0
  }
}, { timestamps: true })

const Inventory = model("Inventory", inventorySchema);
module.exports = Inventory;

