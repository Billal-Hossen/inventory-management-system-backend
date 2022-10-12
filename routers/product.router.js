


const router = require('express').Router()
const { getAllProducts, createProduct, updateSingleProductController, bulkUpdateProductController, deleteSingleProductController, bulkDeleteProductController } = require('../controllers/product.controller');
const admin = require('../middlewares/admin');
const authorize = require('../middlewares/authorize');

router.route("/")
  .get(getAllProducts)
  .post([authorize, admin], createProduct);

router.route("/bulk-update")
  .patch(bulkUpdateProductController)
router.route("/bulk-delete")
  .delete(bulkDeleteProductController)


router.route('/:id')
  .patch(updateSingleProductController)
  .delete(deleteSingleProductController)

module.exports = router;