const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    billboard: {
        type: String,
    },
    billboard_mb: {
        type: String,
    },
    video: {
        type: String,
    }
    });

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;