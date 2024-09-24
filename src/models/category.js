const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'] , unique : true,trim : true},
    isActive : {type : Boolean, default : true}
},{timestamps : true}); 
module.exports = mongoose.model('Category', CategorySchema)