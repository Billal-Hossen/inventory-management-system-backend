const { CreateInvoiceController, getInvoicesController } = require('../controllers/invoice.controller');
const authorize = require('../middlewares/authorize');
const admin = require('../middlewares/admin');

const router = require('express').Router()

router.route('/').get([authorize, admin], getInvoicesController)


module.exports = router;