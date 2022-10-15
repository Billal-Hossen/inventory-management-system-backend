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

module.exports.getInvoicesService = async (data) => {
  console.log(data)
  let result;
  // filer by exit customer name or product name
  if (data.customerName || data.productName) {
    result = await Invoice.find(
      { $or: [{ customerName: data.customerName }, { productName: data.productName }] }
    )
  } else {
    // all invoice list
    result = await Invoice.find({})
  }


  return result;
}