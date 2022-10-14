const Inventory = require("../models/inventory.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const { createInvoiceService } = require("./invoice.service");

exports.createOrderService = async (data) => {
  const { price, unit, sellCount, current_quantity, buy_price } = await Product.findById({ _id: data.productId })
  data.total = data.quantity * price;
  data.unit = unit;
  const order = await Order.create(data);
  //update produt
  const newProduct = {
    sellCount: sellCount + data?.quantity,
    current_quantity: current_quantity - data?.quantity
  }
  const product = await Product.updateOne({ _id: data.productId }, newProduct, { runValidators: true })




  // Update inventory
  const inventory = await Inventory.find({})

  const newInventory = {
    total_sale: inventory[0].total_sale + (data.quantity * price),
    total_profit: inventory[0].total_profit + ((data.quantity * price) - (data.quantity * buy_price))
  }
  console.log(newInventory)
  const updateInvoice = await Inventory.updateOne({ _id: inventory[0]?._id }, newInventory, { runValidators: true })

  // invoice create 
  data = {
    orderId: order._id
  }
  const result = await createInvoiceService(data)
  if (!result) {
    res.status(200).json({
      success: true,
      message: "Invoice is not created Successfully.",
      data: result
    })
  }


  return order;
}