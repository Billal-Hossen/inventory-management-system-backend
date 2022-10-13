const { Schema, model } = require("mongoose");
const invoiceSchema = Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customerName: String,
  productName: String,
  productQuantity: Number,
  total: Number,
  unit: String
}, { timestamps: true })
const Invoice = model("Invoice", invoiceSchema)
module.exports = Invoice;

