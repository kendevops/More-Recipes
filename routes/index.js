const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');
const userController = require('../controllers/userController');
const auth = require('express-jwt-token');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
    //res.sendfile("index.html");
});

// Show the login page
router.get('/login', function (req, res) {
    res.render('login');
});

// Require jwt authorization on only api routes
//router.all('/api/recipes*', auth.jwtAuthProtected);


//Routes Authentication
router.post('/api/users/signup', userController.signUp);
router.post('/api/users/signin', userController.signIn);
router.get('/api/users/signout', userController.signOut);


//Routes that can be accessed only by authenticated users
router.get('/api/recipes/:recipeId', recipesController.getById);
router.post('/api/recipes',  recipesController.create);
router.post('/api/recipes/:recipeId/reviews',  recipesController.review);
router.put('/api/recipes/:recipeId',  recipesController.update);
router.delete('/api/recipes/:recipeId',  recipesController.delete);
router.get('/api/recipes',  recipesController.getAll);


module.exports = router;
