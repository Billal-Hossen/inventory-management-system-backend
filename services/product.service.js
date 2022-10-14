const Product = require("../models/product.model")
const request = require("express/lib/request")
const Inventory = require("../models/inventory.model")
exports.getProductService = async (filters, queries) => {
  console.log(queries)
  const products = await Product.find({}).populate("created_by")
  const totalProducts = await Product.countDocuments()
  const pageCount = await Math.ceil(totalProducts / queries.limit)
  return { totalProducts, pageCount, products };
}
exports.createProductService = async (data) => {

  const product = await Product.create(data);
  const { _id: productId } = product;
  //update Brand
  const inventory = await Inventory.find({})
  const res = await Inventory.updateOne(
    { _id: inventory[0]._id },
    { $push: { products: productId } }
  )
  console.log(res)
  return product;
}

exports.updateProductService = async (id, data) => {

  // const result = await Product.updateOne({ _id: id }, { $set: data }, { runValidators: true });

  // another way for update
  const product = await Product.findById({ _id: id })
  const result = await product.set(data).save()
  return result;
}

exports.BbulkUpdateProductService = async (data) => {
  console.log(data.products)
  const products = []
  data.products.map(product => {
    console.log(product)
    products.push(Product.updateOne({ _id: product.id }, product.data, { runValidators: true }))

  });
  const result = await Promise.all(products)
  return result;
}


exports.deleteSingleProductService = async (id) => {

  const result = await Product.deleteOne({ _id: id });
  return result;
}

exports.BbulkDeleteProductService = async (ids) => {
  const result = await Product.deleteMany({ _id: ids })
  return result;
}