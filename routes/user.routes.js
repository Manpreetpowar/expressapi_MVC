const express = require('express');
const UserController = require('../controllers/user.controller');
const router = express.Router();
const {UserRegisterValidate,UserLoginValidate,UserOTPValidate,userDetails} = require('../utils/userValidation');
const {ensureAuthenticated} = require('../utils/auth');
const userController = new UserController();
const multer = require('multer');


// Set up Multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// router.post('/register',upload.any(), upload.single('profile_image'),UserRegisterValidate, userController.registerUser);

router.post('/register', upload.single('profile_image'), UserRegisterValidate, userController.registerUser);



router.post('/login', UserLoginValidate,userController.loginUser);
router.get('/list',ensureAuthenticated,userController.getUsers);
router.get('/customer_details',ensureAuthenticated,userController.userDetails);
router.post('/verifyOTP', UserOTPValidate, userController.verifyOTP);
router.post('/send_notification', userController.sendNotification);
module.exports = router;