const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
      type: String
    },
    picture: {
        type: String,
    },
    description: {
        type: String
    },
    ref: {
        type: String
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;