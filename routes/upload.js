const express = require('express');
const UploadController = require("../controllers/upload")
const checkAuth = require('../middlewares/check-auth');
const router = express.Router();

router.post('/upload',
             checkAuth,
             upload);

function upload(req, res){
    UploadController
        .uploadImage(req, res)
        .then((data) => {})
        .catch((err) => console.log(err))
}

module.exports = router;
