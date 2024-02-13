const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const categorySchema = new Schema({
    _id: {type: objectId, auto:true},
    name: {type: String, required:true},
    image: {type: String, required:true},
    status:{
        type:String,
        enum: ['0', '1'],
        default: '1'
    },
},{
    versionKey:false
});


const category = mongoose.model('categories', categorySchema);
module.exports = category;