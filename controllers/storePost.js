const path = require('path');
const fs = require('fs');
const Post = require('../database/models/Post')

module.exports = async (req, res) => {
    const { image } = req.files;
    const uploadPath = path.resolve(__dirname, '..', 'public/posts');

    // Check if the directory exists, and create it if it doesn't
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    try {
        // Move the uploaded image to the target directory
        await image.mv(path.join(uploadPath, image.name));

        // Create the post using the data in the request body
        const post = await Post.create({
            ...req.body,
            image: `/posts/${image.name}` // Save the relative path of the image in the post document
        });

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while storing the post.');
    }
};