const router = require('express').Router();

const sequelize = require('../config/connection');

const { User,Post,Comment} = require('../models');

// display all users.
router.get('/', (req, res) => {
    User.findAll({
   
    })
      .then(dbUserData => {
        // pass a single post object into the homepage template
        // get method in sequelize does serialize the data like res.json did automatically in API routes.
        const users = dbUserData.map(user => user.get({plain: true}));
        console.log(users);
        res.render('users', {
          users,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
      }
    res.render('login');
  });


  
  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
      }
    res.render('signup');
  });




























  module.exports = router;