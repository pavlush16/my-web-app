const path = require('path');
const expressEdge = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const fs = require('fs');

const Post = require('./database/models/Post')

const app = new express();

mongoose.connect('mongodb://localhost:27017/bloghub')

app.use(fileUpload())
app.use(express.static('public'))
app.use(expressEdge)
app.set('views', `${__dirname}/views`)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    const posts = await Post.find({})
    res.render('index', {
        posts
    })
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.post('/posts/store', async (req, res) => {
    const { image } = req.files;
    const uploadPath = path.resolve(__dirname, 'public/posts');

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
});

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.listen(4000, () => {
    console.log('App listening on port 4000');
})
