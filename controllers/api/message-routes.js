const router = require('express').Router();
const { User, Conversation, Message } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /api/messages
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    Message.findAll({
        attributes: ['id', 'content', 'user_id', 'conversation_id', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Conversation,
                attributes:['id']
            }
        ]
    })
        // Sequelize is a JavaScript Promise-based library, meaning we get to use .then() with all of the model methods!
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get('/:id', (req, res) => {
    // Access our User model and run .findAll() method)
    Message.findAll({
        where: { id: req.params.id},
        attributes: ['id', 'content', 'user_id', 'conversation_id', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Conversation,
                attributes:['id','created_at']
            }
        ]
    })
        // Sequelize is a JavaScript Promise-based library, meaning we get to use .then() with all of the model methods!
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.post('/', (req, res) => {
    // check the session
    // was req.session not stopping adding comment for non logged in user

    Message.create({
        content: req.body.content,
        // use the id from the session
        // user_id: req.session.user_id,
        user_id: req.body.user_id,
        conversation_id: req.body.conversation_id
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });

});




module.exports = router;