const expressEdge = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require('connect-flash');

const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const getAboutController = require('./controllers/getAbout');
const createUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');

const app = new express();

mongoose.connect('mongodb://localhost:27017/bloghub');

app.use(connectFlash());

const mongoStore = connectMongo(expressSession);

app.use(expressSession({
    secret: 'secret',
    resave: false, // Set to false to prevent session being saved on every request
    saveUninitialized: false, // Set to false to prevent empty sessions from being saved
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))

app.use(fileUpload());
app.use(express.static('public'));
app.use(expressEdge);
app.set('views', `${__dirname}/views`);

app.use('*', (req, res, next) => {
    app.locals.auth = req.session.userId
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storePost = require('./middleware/storePost');
const auth = require('./middleware/auth')
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')

app.get('/', homePageController);
app.get('/posts/new', auth, createPostController);
app.post('/posts/store', auth, storePost, storePostController);
app.get('/post/:id', getPostController);
app.get('/about', getAboutController);
app.get('/auth/register', redirectIfAuthenticated, createUserController);
app.post('/users/register', redirectIfAuthenticated, storeUserController);
app.get('/auth/login', redirectIfAuthenticated, loginController);
app.post('/users/login', redirectIfAuthenticated, loginUserController);
app.get('/auth/logout', auth, logoutController);
app.use((req, res) => res.render('not-found'));

app.listen(4000, () => {
    console.log('App listening on port 4000');
});
