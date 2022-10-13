const Order = require("../models/order.model");
const Product = require("../models/product.model");

exports.createOrderService = async (data) => {
  const { price, unit } = await Product.findById({ _id: data.productId })
  data.total = data.quantity * price;
  data.unit = unit;
  const order = await Order.create(data)

  return order;
}