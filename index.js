const expressEdge = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const getAboutController = require('./controllers/getAbout');

const app = new express();

mongoose.connect('mongodb://localhost:27017/bloghub');

app.use(fileUpload());
app.use(express.static('public'));
app.use(expressEdge);
app.set('views', `${__dirname}/views`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storePost = require('./middleware/storePost')

app.get('/', homePageController);
app.get('/posts/new', createPostController);
app.post('/posts/store', storePost, storePostController);
app.get('/post/:id', getPostController);
app.get('/about', getAboutController);

app.listen(4000, () => {
    console.log('App listening on port 4000');
})
