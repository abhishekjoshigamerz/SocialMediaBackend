const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth/auth');

router.get('/register',authController.registerPage);
router.post('/register',authController.register);


module.exports = router;