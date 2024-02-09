const UserModel = require('../models/UserModel');
const httpStatusCodes = require('http-status-codes');
const ApiResponse = require('../controllers/api.response');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController{
    //validate req.body
    //create MongoDB UerModel
    //do password encription
    //save data to mongodb
    //return response to the client
    registerUser = async (req,res) => {
        // res.send(await bcrypt.hash(req.body.password,10));
        const userModel = new UserModel(req.body);
        userModel.password = await bcrypt.hash(req.body.password,10);
        try {
            const response = await userModel.save();
            response.password = undefined;
            const responsedata = new ApiResponse(httpStatusCodes.StatusCodes.CREATED, 'success', response);
            responsedata.send(res);
        } catch (error) {
            const response = new ApiResponse(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, error.message, {});
            response.send(res);
        }
    }
    

    loginUser = async (req,res) => {
       try {
       const user = await UserModel.findOne({email:req.body.email});
      
       if(!user){
            // const response = new ApiResponse(httpStatusCodes.StatusCodes.UNAUTHORIZED,'Auth failed, Invalid username/password',{});
            // response.send(res);
            return res.status(401).json({message:'Auth failed, Invalid username/password'});
       }
      
       const isPasswordEqual = await bcrypt.compare(req.body.password, user.password);
       if(!isPasswordEqual){
            // const response = new ApiResponse(httpStatusCodes.StatusCodes.UNAUTHORIZED,'Auth failed, Invalid username/password',{});
            // response.send(res);
            return res.status(401).json({message:'Auth failed, Invalid username/password'});
        }

        const tokenObject ={
            _id      : user._id,
            fullName : user.fullName,
            email    :user.email
        }
        const jwtToken =  jwt.sign(tokenObject, process.env.SECRET, {expiresIn:'4h'})
       tokenObject.jwtToken = jwtToken;
       const response = new ApiResponse(httpStatusCodes.StatusCodes.OK, 'Login successfully', tokenObject);
        response.send(res);
       } catch (error) {
        const response = new ApiResponse(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR, error.message, {});
        response.send(res);
       }
    }
}

module.exports = UserController;