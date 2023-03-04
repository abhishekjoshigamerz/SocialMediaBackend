const express = require('express');
const router = express.Router();

const userController = require('../../controllers/user/user');



router.get('/user/:id', userController.getUser);

router.put('/user/update/:id', userController.updateUser);

router.get('/user/delete/:id', userController.deleteUser);

//follow user 
router.put('/user/:id/follow', userController.followUser);

module.exports = router;