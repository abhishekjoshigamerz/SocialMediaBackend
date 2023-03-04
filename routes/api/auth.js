const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth/auth');
const validator = require('../../middlewares/validators');

router.post('/register',validator.registerValidator, authController.register);

router.post('/login',validator.loginValidator, authController.login);



module.exports = router;