const express = require('express');
const UserController = require('../controllers/user.controller');
const router = express.Router();
const {UserRegisterValidate,UserLoginValidate} = require('../utils/userValidation');
const userController = new UserController();

router.post('/register',UserRegisterValidate, userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;