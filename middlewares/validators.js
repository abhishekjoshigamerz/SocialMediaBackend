const { body } = require('express-validator');
module.exports.registerValidator = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().isLength({ min: 8 }).withMessage('Password is required and must be at least 8 characters long'),
];

module.exports.loginValidator = [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required '),
];