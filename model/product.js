
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
    },
    quantity : {
        type : Number,
        required : true,
    },

},{
    timestamps : true,
});


const Product = mongoose.model('Products', productSchema);

module.exports = Product;