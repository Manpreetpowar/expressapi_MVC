const mongoose = require('mongoose');

const objectId = mongoose.Schema.Types.ObjectId;
const ServiceSchema = mongoose.Schema({
    customer:{
        type:objectId,
        ref:'users'
    },
    provider:{
        type:objectId,
        ref:'users'
    },
    booking_date:{
        type:String,
     
    },
    booking_time:{
        type:Number,
    },
    work_time:{
        type:Number,
    },
    start_time:{
        type:String
    },
    end_time:{
        type:String
    },
    status:{
        type:String,
        enum: ['requested','accept','decline','cancelled','not_started', 'started','completed'],
        default: 'not_started'
    },
    status_action:{
        type: objectId,
        ref:'users'
    },
    payment_status:{
        type:String,
        enum: ['pending', 'paid'],
        default: 'pending'
    },
    visiting_charges :{
        type: Number,
        min:0
    },
    per_hour_charges :{
        type: Number,
        min:0
    },
    app_charges :{
        type: Number,
        min:0
    },
    customer_location:{
        type: String
    },
    customer_latitude:{
        type: String
    },
    customer_longitude:{
        type: String
    },
    provider_location:{
        type: String
    },
    provider_latitude:{
        type: String
    },
    provider_longitude:{
        type: String
    },
    distance:{
        type: String
    },
    customer_comment:{
        type: String
    },
    provider_comment:{
        type: String
    },
    images: [{
        type: String  
    }],
    created_at:{
        type:Date,
        default:Date.now
    }
});


// Middleware to format createdAt date
// ServiceSchema.pre('createdAt', function(next) {
//     // Format the date to Y-m-d format
//     this.createdAt = this.createdAt.toISOString().split('T')[0];
//     next();
// });



const ServiceModel = mongoose.model('services', ServiceSchema);
module.exports = ServiceModel;