


const router = require('express').Router()
const { getAllProducts, createProduct, deleteSingleProductController, } = require('../controllers/product.controller');
const admin = require('../middlewares/admin');
const authorize = require('../middlewares/authorize');

router.route("/")
  .get(getAllProducts)
  .post([authorize, admin], createProduct);





router.route('/:id')
  .delete([authorize, admin], deleteSingleProductController)

module.exports = router;