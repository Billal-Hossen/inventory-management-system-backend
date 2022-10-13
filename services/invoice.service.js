const Invoice = require("../models/invoice.model");
const Order = require("../models/order.model");



exports.createInvoiceService = async (data) => {


  const customer = await Order.findById({ _id: data.orderId }).populate("customerId").populate("productId")

  data.customerName = customer.customerId.name;
  data.productName = customer.productId.name;
  data.productQuantity = customer.quantity;
  data.total = customer.total;
  data.unit = customer.unit;

  const invoice = await Invoice.create(data)
  return invoice;
}