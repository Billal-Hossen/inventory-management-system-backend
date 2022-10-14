const { CreateInventoryController, getInventoryController } = require('../controllers/inventory.controller');
const admin = require('../middlewares/admin');
const authorize = require('../middlewares/authorize');



const router = require('express').Router()

router.route('/').post([authorize, admin], CreateInventoryController).get([authorize, admin], getInventoryController)


module.exports = router;