const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema({
    customer:{
        type:objectId,
        ref:'users'
    },
    provider:{
        type:objectId,
        ref:'users'
    },
    date:{
        type:String,
        required:true
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
        enum: ['not_started', 'started','completed'],
        default: 'not_started'
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
    origin:{
        type: String
    },
    origin_latitude:{
        type: String
    },
    origin_longitude:{
        type: String
    },
    destination:{
        type: String
    },
    destination_latitude:{
        type: String
    },
    destination_longitude:{
        type: String
    },
    distance:{
        type: String
    },
    customer_comment:{
        type: String
    },
    technician_comment:{
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
ReviewSchema.pre('save', function(next) {
    // Format the date to Y-m-d format
    this.createdAt = this.createdAt.toISOString().split('T')[0];
    next();
});



const ServiceModel = mongoose.model('services', ServiceSchema);
module.exports = ServiceModel;