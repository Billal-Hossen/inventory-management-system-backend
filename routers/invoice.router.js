const { CreateInvoiceController, getInvoicesController } = require('../controllers/invoice.controller');
const authorize = require('../middlewares/authorize');
const { Customer } = require('../middlewares/cutomer');


const router = require('express').Router()

router.route('/').post(CreateInvoiceController).get(getInvoicesController)


module.exports = router;