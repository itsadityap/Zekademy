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
            return res.redirect(`${image[i].link}`)
        }
    }

    res.status(404).send({message:"Cannot Find Your Image, Make sure you write a correct URL."})
}

module.exports = {
    getImage
}