const { CreateOrderController } = require('../controllers/order.controller');
const authorize = require('../middlewares/authorize');
const { Customer } = require('../middlewares/cutomer');


const router = require('express').Router()

router.route('/').post([authorize, Customer], CreateOrderController)


module.exports = router;