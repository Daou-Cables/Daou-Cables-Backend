const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    level: {
      type: Number,
      required: true,
      enum: [1, 2]
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;