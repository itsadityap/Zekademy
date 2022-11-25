const User = require('../models/user')

async function getImage (req, res) 
{
    const getURL = req.params.id;

    let id = await User.find();
    let image = id[0].imageID;

    for(let i=0;i<image.length;i++)
    {
        if(image[i].idImage === getURL)
        {
            res.status(200).json({
                'Link': image[i].link
            })
        }
    }
}

module.exports = {
    getImage
}