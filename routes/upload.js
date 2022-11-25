const express = require('express');
const UploadController = require("../controllers/upload")
const router = express.Router();

router.post('/upload', upload);

function upload(req, res){
    UploadController
        .uploadImage(req, res)
        .then((data) => {})
        .catch((err) => console.log(err))
}

module.exports = router;
