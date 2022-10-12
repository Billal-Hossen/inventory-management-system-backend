const { createUserController, signInController } = require('../controllers/user.controller');

const router = require('express').Router()

router.route('/signup').post(createUserController)
router.route("/signin").post(signInController)

module.exports = router;