const express = require('express');
const UserController = require('../controllers/user.controller');
const router = express.Router();
const {UserRegisterValidate,UserLoginValidate,UserOTPValidate,userDetails} = require('../utils/userValidation');
const {ensureAuthenticated} = require('../utils/auth');
const userController = new UserController();
const upload = require('multer')();

router.post('/register',upload.any(),UserRegisterValidate, userController.registerUser);
router.post('/login', UserLoginValidate,userController.loginUser);
router.get('/list',ensureAuthenticated,userController.getUsers);
router.get('/customer_details',ensureAuthenticated,userController.userDetails);
router.post('/verifyOTP', UserOTPValidate, userController.verifyOTP);

module.exports = router;