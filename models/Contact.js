const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    email: [{
        type: String,
        required: true
    }],
    phone: [{
        type: String
    }],
    address: [{
        type: String
    }],
    fax: [{
        type: String
    }],
    instagram: {
        type: String
    },
    wechat: [{
        type: String
    }],
    facebook: {
        type: String
    }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;