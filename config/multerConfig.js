const multer = require('multer');

// Set Multer storage option
const storage = multer.memoryStorage();

// Initialize upload middleware with storage and file size limit
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // for example, limit file size to 5MB
});

module.exports = upload;
