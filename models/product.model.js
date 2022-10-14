const { Schema, model } = require("mongoose")
const valid = require("validator");
const { ObjectId } = Schema.Types;
//Product schema

const productSchema = Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    minLength: [3, "Product name at least 2 charater."],
    maxLength: [100, "Product name is too long."],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, "Product description is required."],

  },
  buy_price: {
    type: Number,
    required: true,
    min: [0, "Product price can't be negative"]
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Product price can't be negative"]
  },

  unit: {
    type: String,
    required: true,
    enum: {
      values: ['kg', 'litter', 'psc', 'bag'],
      message: "Unit must be kg/litter/psc/bag"
    }
  },
  imageURLs: [{
    type: String,
    required: true,
    validate: [valid.isURL, "wrong url"]
  }],


  buy_quantity: {
    type: Number,
    required: true,
    min: [0, "Product of buy quantity can't be negative"]
  },
  current_quantity: {
    type: Number,
    required: true,
    min: [0, "Product of current  quantity can't be negative"]
  },


  status: {
    type: String,
    required: true,
    enum: {
      values: ["in-stock", "Out-of-stock", "discontinued"],
      message: "Status can't be {value}"
    }
  },

  created_by: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  sellCount: {
    type: Number,
    default: 0,
    min: 0
  }




}, { timestamps: true })

// Modle
const Product = model("Product", productSchema)

module.exports = Product;