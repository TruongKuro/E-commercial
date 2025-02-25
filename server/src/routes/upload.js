const router = require("express").Router();
const multer =require('multer');
const path =require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, '../client/public/img/');
            //cb(null,'https://api.cloudinary.com/v1_1/dt7iztktf/image/upload/')
        },
        filename: function(req, file, callback) {
            callback(null, Date.now() + path.extname(file.originalname));
        }
    })
})


router.post('/image', upload.single('file'), (req, res) => {
	res.send(req.file.filename);
})

module.exports = router;