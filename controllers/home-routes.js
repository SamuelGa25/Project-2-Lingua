const router = require('express').Router();

const sequelize = require('../config/connection');

const { User, Post, Comment, Message, Conversation, Vote } = require('../models');

// display all users.
router.get('/', (req, res) => {
  Post.findAll({

    attributes: ['id', 'title', 'content', 'created_at', 'updated_at'],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        key: ['username']
      },

    ]
  })
    .then(dbPostData => {
      // pass a single post object into the homepage template
      // get method in sequelize does serialize the data like res.json did automatically in API routes.
      const posts = dbPostData.map(post => post.get({ plain: true }));
      // console.log(posts);
      res.render('homepage', {
        posts,
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
  res.render('login', {
    loggedIn: req.session.loggedIn
  });
});



router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup', {
    loggedIn: req.session.loggedIn
  });
});



// router.get('/chat', (req, res) => {
//   res.render('chat', {
//     loggedIn: req.session.loggedIn
//   })
// });



router.get('/find-friends', (req, res) => {


  User.findAll({
    order: [['id', 'DESC']]
  })
    .then(dbUserData => {
      // pass a single user object into the homepage template
      // get method in sequelize does serialize the data like res.json did automatically in API routes.
      const users = dbUserData.map(user => user.get({ plain: true }));
      // console.log(users);
      res.render('find-friends', {
        users,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/account', (req, res) => {


  User.findOne({
    where: {
      id: req.session.user_id
    }
  }).then(dbUserData => {
    const user = dbUserData.get({ plain: true })
    res.render('account', {
      user,
      loggedIn: req.session.loggedIn

    })
  })
});

router.get('/account/edit/:id', (req, res) => {


  User.findOne({
    where: {
      id: req.session.user_id
    }
  }).then(dbUserData => {
    const user = dbUserData.get({ plain: true })
    res.render('edit-user', {
      user,
      loggedIn: req.session.loggedIn

    })
  })
});


// to get a single post 
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'content',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        order:[['created_at', 'DESC']],
        include: {
          model: User,
          attributes: ['username', 'native_language']
        }
      },
      {
        model: User,
        attributes: ['username', 'native_language']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      // update it in 14.3.6 with helpers
      res.render('post-comment', {
        //  variables that are passed to view templates are automatically passed to the main layout. 
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