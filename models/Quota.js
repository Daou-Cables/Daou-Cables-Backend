const mongoose = require('mongoose');

const quotaSchema = new mongoose.Schema({
    name:{
        type: String
    },
    description:{
        type: String
    },
    phone:{
        type: String
    },
    email:{
        type: String
    },
    description:{
        type: String
    },
});

const Quota = mongoose.model('Quota', quotaSchema);