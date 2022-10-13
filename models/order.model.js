const { Schema, model } = require('mongoose');

const OrderSchema = Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  total: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
    max: 5
  },
  unit: {
    type: String,
    required: true,
    enum: {
      values: ['kg', 'litter', 'psc', 'bag'],
      message: "Unit must be kg/litter/psc/bag"
    }
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "done"],
  }
}, { timestamps: true });



const Order = model("Order", OrderSchema)

module.exports = Order;