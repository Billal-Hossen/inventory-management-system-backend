const { createUserController,
  signInController,
  getCustomerController,
  getSellersController,
  deleteSingleCustomerController,
  deleteSingleSellerController,
} = require('../controllers/user.controller');

const admin = require('../middlewares/admin');
const authorize = require('../middlewares/authorize');

const router = require('express').Router()

router.route('/signup').post(createUserController)
router.route("/signin").post(signInController)

router.route("/customer").get([authorize, admin], getCustomerController)
router.route("/customer/:id").delete([authorize, admin], deleteSingleCustomerController)

router.route("/seller").get([authorize, admin], getSellersController)
router.route("/seller/:id").delete([authorize, admin], deleteSingleSellerController)

module.exports = router;