const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment, Message, Conversation, Vote } = require('../models');
const withAuth = require('../utils/auth');




router.get('/', (req, res) => {
  Post.findAll({
    where: { user_id: req.session.user_id },
    attributes: ['id', 'title', 'content', 'created_at', 'updated_at'],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        key: ['username']
      }
    ]
  })
    .then(dbUserData => {
      // pass a single post object into the homepage template
      // get method in sequelize does serialize the data like res.json did automatically in API routes.
      const posts = dbUserData.map(post => post.get({ plain: true }));
      // console.log(posts);
      res.render('dashboard', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/new-post-page', (req, res) => {
  res.render('new-post-page', {
    loggedIn: req.session.loggedIn
  })
});


// Get route for edit/:id
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'content', 'title', 'created_at'],
    include: [
      // include the Comment model here:
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        order: [['created_at', 'DESC']],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      const post = dbPostData.get({ plain: true });

      res.render('edit-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});







module.exports = router;