const AWS = require('aws-sdk')
const randomID = require('../controllers/generateRandomID')

async function uploadImage(req, res) {

    const s3 = new AWS.S3(); 

    s3.config.update({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
    })

    const fileContent = Buffer.from(req.files.data.data, 'binary');

    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: req.files.data.name,
        Body: fileContent
    }

    const imageID = randomID.generateRandomId()
    console.log(imageID);

    s3.upload(params, (err, data) => {
        if(err)
        {
            throw err;
        }
        res.status(200).json({
            imageID:imageID,
            message: 'Success',
            response_data: data
        })
    })
}

module.exports = {
    uploadImage
}