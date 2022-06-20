const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment, Message, Conversation, Vote } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', (req, res) => {
    Message.findAll({
        attributes: ['id', 'content', 'user_id', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username', 'native_language']
            }
        ]
    }).then(dbMessageData => {
        const messages = dbMessageData.map(message => message.get({ plain: true }));
        // console.log(messages);
        res.render('chat', {
            messages,
            loggedIn: req.session.loggedIn
        })

    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;