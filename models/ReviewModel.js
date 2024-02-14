const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;

const ReviewSchema =  mongoose.Schema({
    customer:{
        type:objectId,
        ref:'users'
    },
    provider:{
        type:objectId,
        ref:'users'
    },
    service:{
        type:objectId,
        ref:'services'
    },
    rating:{
        type:Number,
        min:1,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    reviewer_role:{
        type:String,
        enum: ['customer', 'provider', 'other']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const ReviewModel = mongoose.model('reviews', ReviewSchema);
module.exports = ReviewModel;
