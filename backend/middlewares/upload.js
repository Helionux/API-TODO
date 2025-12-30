const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
        const name = file.originalname.split(' ').join('_').split('.')[0];
        const extension = path.extname(file.originalname);
        callback(null, name + '_' + Date.now() + extension);
    }
});


const fileFilter = (req, file, callback) => {
    if (file.minetype.startsWith('image/')) {
        callback(null, true);
    } else {
        callback(new Error('Le fichier doit etre une image !'), false);
    }
};


const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
});



module.exports = upload;