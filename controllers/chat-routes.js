const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment, Message, Conversation, Vote } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', (req, res) => {
    Message.findAll({
        attributes: ['id', 'content', 'user_id', 'created_at', 'conversation_id'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username', 'native_language']
            }
        ]
    }).then(dbMessageData => {
        const messages = dbMessageData.map(message => message.get({ plain: true}));
        console.log(messages);
        res.render('chat', {
            messages,
            loggedIn: req.session.loggedIn
        })

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