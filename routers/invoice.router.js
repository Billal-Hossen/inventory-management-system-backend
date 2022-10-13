const { CreateInvoiceController } = require('../controllers/invoice.controller');
const authorize = require('../middlewares/authorize');
const { Customer } = require('../middlewares/cutomer');


const router = require('express').Router()

router.route('/').post(CreateInvoiceController)


module.exports = router;