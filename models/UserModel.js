const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
 
    user_name:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    user_type:{
        type:String,
        required:true
    },
    address:{
        type:String,
    },
    latitude:{
        type:String,
    },
    longitude:{
        type:String,
    },
    otp:{
        type:String,
    },
    is_verified:{
        type:String,
        enum: ['0', '1'],
        default: '0'
    },
    fcm_token:{
        type:String,
    },
    is_active:{
        type:String,
        enum: ['0', '1'],
        default: '1'
    },
    profile_image: {
        type: String
    },
    joined_date: {
        type: Date,
        default: () => {
            const date = new Date();
            return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        },
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
