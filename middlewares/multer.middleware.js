const multer = require('multer');

const storage = multer.memoryStorage(); // Store files in memory as buffers

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb({ message: 'Invalid file type. Please upload a JPEG, PNG, or JPG image.', status: 400 }, false);
    }
  },
});

module.exports = upload;