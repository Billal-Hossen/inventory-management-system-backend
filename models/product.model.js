const { Schema, model } = require("mongoose")
const validator = require("validator");
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

  unit: {
    type: String,
    required: true,
    enum: {
      values: ['kg', 'litter', 'psc', 'bag'],
      message: "Unit must be kg/litter/psc/bag"
    }
  },
  // imageUrls: [{
  //   type: String,
  //   required: true,
  //   validate: {
  //     validator: (value) => {
  //       if (!Array.isArray(value)) {
  //         return false;
  //       }
  //       let isValid = true;
  //       value.forEach(url => {
  //         if (!validator.isURL(url)) {
  //           isValid = false;
  //         }

  //       })
  //       return isValid;
  //     },
  //     message: "Please provide valid image urls."
  //   }
  // }],


  quantity: {
    type: Number,
    required: true,
    min: [0, "Quantity can't be negative."],
    validate: {
      validator: (value) => {
        const isInteger = Number.isInteger(value);
        if (isInteger) {
          return true
        }
        else {
          return false
        }

      },
      message: "Quantity must be an integer."
    },

  },

  status: {
    type: String,
    required: true,
    enum: {
      values: ["in-stock", "Out-of-stock", "discontinued"],
      message: "Status can't be {value}"
    }
  },

  createdBy: {
    type: ObjectId,
    ref: "User"
  }




}, { timestamps: true })

// Modle
const Product = model("Product", productSchema)

module.exports = Product;