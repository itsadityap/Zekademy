const AWS = require('aws-sdk')
const randomID = require('../controllers/generateRandomID')
const jwt = require('jsonwebtoken');
const users = require('../models/user')

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

    const ranID = randomID.generateRandomId()

    s3.upload(params,async function(err, data) {
        if(err)
        {
            throw err;
        }
        res.status(200).json({
            imageID: ranID,
            message: 'Success',
            response_data: data
        })

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET)._id;

        await users.findOne({_id:decoded},async function(err, result){
            if(err)
            {
                return res.status(404).send({status:"Error in fetching in your database!!"})
            }
            
            let imageData = {
                idImage : String,
                link : String
            }
            
            imageData.idImage = ranID;
            imageData.link = data.Location;

            if(result)
            {   
                let im = await users.findOne({_id:decoded});
                im.imageID.push(imageData);
                await im.save()
            }
        }).lean()
    })
}

module.exports = {
    uploadImage
}