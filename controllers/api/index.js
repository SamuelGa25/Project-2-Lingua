//  Express.js router

const router = require('express').Router();

const userRoutes = require('./user-routes.js');

const postRoutes = require('./post-routes.js');

const commentRoutes = require('./comment-routes.js');

const conversationRoutes = require('./conversation-routes.js');

const messageRoutes = require('./message-routes.js');




// instruct the router instance to use modules 


router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/messages', messageRoutes);
router.use('/conversations', conversationRoutes);

module.exports = router;