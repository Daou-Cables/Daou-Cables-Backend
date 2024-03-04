const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    logo: {
        type: String,
    },
    billboard: {
        type: String,
    },
    video: {
        type: String,
    }
    });

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;