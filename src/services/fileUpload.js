const multer = require('multer');
const fs = require('fs');
const path = require('path');

const maxSize = 20 * 1024 * 1024; // 20 MB

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      try {
        if (!fs.existsSync('public/arquivos/enviados')) {
          fs.mkdirSync('public/arquivos/enviados', { recursive: true });
        }
        cb(null, 'public/arquivos/enviados');
      } catch (e) {
        console.error(e);
      }
    },
    filename: function (req, file, cb) {
    //   let uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, Date.now() + path.extname(file.originalname));
    }
  })

const fileUpload = multer({ 
    storage,
    limits: { 
        fileSize: maxSize
    }
});

module.exports = fileUpload;
