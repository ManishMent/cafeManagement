const mongoose = require('mongoose');


const ItemSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'] , trim : true, unique : true, },
    price: { type: Number, required: [true, 'Price is required'] },
    isActive : {type : Boolean, default : true},
    categoryId : {type : mongoose.Schema.Types.ObjectId, ref : 'Category' , required : [true, 'Category is required']},

},{timestamps : true}); 
module.exports = mongoose.model('Item', ItemSchema)