const router = require('express').Router();
const { Conversation, User, Message } = require('../../models');
const withAuth = require('../../utils/auth');


// GET all posts
router.get('/', (req, res) => {
    console.log('=================')
    Conversation.findAll({
        include: [
            {
                model: Message,
                include: [{
                    model: User
                }]
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
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});








module.exports = router;