const express = require("express");
const router = express.Router();
const getImageController = require('../controllers/getImage')

router.get("/getImage/:id", getImageRoute)

async function getImageRoute(req,res) {
    getImageController
        .getImage(req,res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

module.exports = router;