const router = require('express').Router();
const { User, Conversation, UserConversation } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    UserConversation.findAll({

    })
        .then(dbUserConversationData => res.json(dbUserConversationData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.post('/', (req, res) => {
    UserConversation.create({
        conversation_id: req.body.conversation_id,
        user_id: req.body.user_id
    })
        .then(dbUserConversationData => res.json(dbUserConversationData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

module.exports = router;