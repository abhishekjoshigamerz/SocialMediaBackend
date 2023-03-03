const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/user');
console.log('Router loaded');

router.get('/', userController.home);

router.use('/api/auth', require('./auth'));
module.exports = router;