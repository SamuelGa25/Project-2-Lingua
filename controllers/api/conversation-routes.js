const router = require('express').Router();
const { Conversation, User, Message, UserConversation } = require('../../models');
const withAuth = require('../../utils/auth');


// GET all posts
router.get('/', (req, res) => {
    console.log('=================')
    Conversation.findAll({
        include: [
            {
                model: User,
                attributes: ['username'],
                through: UserConversation
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// POST create one post 
router.post('/', (req, res) => {
    Conversation.create({
        title: req.body.title,
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});








module.exports = router;