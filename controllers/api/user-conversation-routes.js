const router = require('express').Router();
const { User, Conversation, UserConversation } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    UserConversation.findAll({

    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})


module.exports = router;