const UserModel = require('../models/UserModel');
const httpStatusCodes = require('http-status-codes');
const ApiResponse = require('../controllers/api.response');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
const {getLatLongFromLocation}  = require('../utils/getLatLongFromAddress');
const {sendFCMNotification} = require('../utils/sendNotification');
const nodemailer = require('nodemailer');

    
    //EMAIL SEND CODE*****************************
   const sendRegistrationEmail = async (email, user_id, otp) => {
        // Create a transporter object using SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port:587,
            auth: {
                user: 'developer.macrew@gmail.com', // Your email address
                pass: 'rylnssryqwrwvvfl' // Your email password
            }
        });
    
        // Email content
        let mailOptions = {
            from: 'manpreet.p@macrew.net', // Sender address
            to: email, // Recipient address
            subject: 'Welcome to Our App', // Subject line
            text: `Dear ${user_id},\n\nWelcome to Our App!\n\nYour OTP for registration is: ${otp}\n\nThanks,\nYour App Team`
        };
    
        // Send email
        await transporter.sendMail(mailOptions);
    };
class UserController{


    //USER REGISTERATION CODE***********************
    registerUser = async (req,res) => {
        try {
            const existUser = await UserModel.findOne({user_id:req.body.user_id});
            if(existUser){
                const response = new ApiResponse(httpStatusCodes.StatusCodes.CONFLICT, 'User Id already exists', {});
                return response.send(res);
            }

            const existUserPhone = await UserModel.findOne({phone:req.body.phone});
            if(existUserPhone){
                const response = new ApiResponse(httpStatusCodes.StatusCodes.CONFLICT, 'Phone already exists', {});
                return response.send(res);
            }
            
            //generate random 4 digit code*********
            const randomNumber = Math.floor(1000 + Math.random() * 9000);
            const otp =  randomNumber.toString();

            const userModel = new UserModel(req.body);
            userModel.password = await bcrypt.hash(req.body.password,10);
            userModel.otp = otp;
            const {lat,lng,name} = await getLatLongFromLocation({address:req.body.address});
            if (!lat || !lng || !name) {
                userModel.latitude = '';
                userModel.longitude = '';
            } else {
                userModel.latitude = lat;
                userModel.longitude = lng;
            }

                // Send registration email
               await sendRegistrationEmail(req.body.email, req.body.user_id, otp);

        //    console.log(req.file);
            // If profile image is uploaded, save its path in the userModel
            if (req.file) {
                userModel.profile_image = req.file.filename; // Assuming 'profile_image' is the field name in the model
            }


            const response = await userModel.save();
            response.password = undefined;
            const responsedata = new ApiResponse(httpStatusCodes.StatusCodes.CREATED, 'success', response);
            return responsedata.send(res);
        } catch (error) {
            const response = new ApiResponse(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, error.message, {});
            return response.send(res);
        }
    }
    
    //LOGIN CODE****************************************
    loginUser = async (req,res) => {
       try {
       const user = await UserModel.findOne({user_id:req.body.user_id});
      
       if(!user){
            const response = new ApiResponse(httpStatusCodes.StatusCodes.UNAUTHORIZED,'Auth failed, Invalid username/password',{});
          return  response.send(res);
            // return res.status(401).json({message:'Auth failed, Invalid username/password'});
       }
      
       const isPasswordEqual = await bcrypt.compare(req.body.password, user.password);
       if(!isPasswordEqual){
            const response = new ApiResponse(httpStatusCodes.StatusCodes.UNAUTHORIZED,'Auth failed, Invalid username/password',{});
           return response.send(res);
            // return res.status(401).json({message:'Auth failed, Invalid username/password'});
        }

        const tokenObject ={
            id      : user._id,
            user_name : user.user_name,
            user_id    :user.user_id
        }
        const jwtToken =  jwt.sign(tokenObject, process.env.SECRET, {expiresIn:'8h'})
        // console.log(jwtToken);
       tokenObject.jwtToken = jwtToken;
       const response = new ApiResponse(httpStatusCodes.StatusCodes.OK, 'Login successfully', tokenObject);
        return response.send(res);
       } catch (error) {
            const response = new ApiResponse(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, error.message, {});
            return response.send(res);
       }
    }

    //CODE TO VERIFY THE OTP***********************************
    verifyOTP = async(req, res) => {
        try {
            const matchedUser = await UserModel.findOne({phone:req.body.phone,otp:req.body.otp});
            
            if(matchedUser) {
                // console.log('OTP matched:', matchedUser);
               const updated_object =  await UserModel.findByIdAndUpdate(
                    matchedUser._id,
                    {$set: {is_verified : '1'} },
                    {new: true}
                );
                updated_object.password = undefined;
                const response = new ApiResponse(httpStatusCodes.StatusCodes.CREATED, 'OTP verified successfully', updated_object);
                return response.send(res);
            } else {
                const response = new ApiResponse(httpStatusCodes.StatusCodes.UNAUTHORIZED,'Invalid OTP',{});
                return response.send(res);
            }
        } catch (error) {
            const response = new ApiResponse(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, error.message, {});
            return response.send(res);
        }
       
    }


    //GET ALL THE USER LIST************************************
    getUsers = async (req,res) => {
        try {
           const users  = await UserModel.find({},{password:0});
            const response = new ApiResponse(httpStatusCodes.StatusCodes.OK, 'Users list', users);
            return response.send(res);
        } catch (error) {
            const response = new ApiResponse(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, error.message, {});
            return response.send(res);  
        }
    }

    userDetails = async(req,res) => {
        try {
            const decoded = jwt.verify(req.headers['authorization'],process.env.SECRET);
            if(decoded){
                // return res.send(decoded);
                // If token is valid, fetch user details using the decoded user ID
                const userdata = await UserModel.findById(decoded.id).populate('category');
                if (!userdata) {
                    const response = new ApiResponse(httpStatusCodes.StatusCodes.NOT_FOUND, 'User not found', {});
                    return response.send(res);
                }
    
                // Return user details in the response
                const response = new ApiResponse(httpStatusCodes.StatusCodes.OK, 'Customer Detail', userdata);
                return response.send(res);
            }
        } catch (error) {
            const response = new ApiResponse(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, error.message, {});
            return response.send(res); 
        }
    }



// Updated function to send notification
sendNotification = async (req, res) => {
    try {
        const token = 'dvrCpmnYfko6mLlEvrxPfq:APA91bFQRqGnrUVDqXoaTA3QtRRanpWWJxgBk_YO6nw9QVWYlX2Oyoq69ETurviYsXSfIk6Y1aIt3eqIWNMvZ6DAgyqVMmUFGKzP2vCEgSU8rEVV7D4P_VL5wdsT3X9XaycWF89JXSd_'; // Replace with actual FCM token
        const title = 'Test Notification';
        const body = 'This is a test notification';
        await sendFCMNotification(token, title, body);
        res.send('Test notification sent successfully');
    } catch (error) {
        if (error.code === 'messaging/registration-token-not-registered') {
            console.error('FCM registration token is not valid:', error);
            res.status(400).send('FCM registration token is not valid');
        } else {
            console.error('Error sending test notification:', error);
            res.status(500).send('Failed to send test notification');
        }
    }
};


}

module.exports = UserController;