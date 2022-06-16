const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    console.log('==================');
    Comment.findAll(
        {
            attributes: ['id', 'comment_text', 'created_at', 'post_id', 'user_id'],
           // to show the last post first
           order: [['created_at', 'DESC']], 
            include: [
                {
                    model: Post,
                    attributes: ['id', 'content', 'title', 'created_at'],
                    include: [
                        {
                            model: User,
                            attributes: ['username']
                        }
                    ]
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/',withAuth, (req, res) => {
    // check the session
    // was req.session not stopping adding comment for non logged in user
    if (req.session.loggedIn) {
      Comment.create({
        comment_text: req.body.comment_text,
        // use the id from the session
        user_id: req.session.user_id,
        post_id: req.body.post_id
      })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  });

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy(
        {
            where: { id: req.params.id }
        })
        .then(dbCommentData => {
            if (!dbCommentData){
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
                    // The response from the request in Insomnia displays the number of rows or entries that were affected by this query. As we expected, a single entry was deleted from the database
                    res.json({ numberOfRowsAffected: dbCommentData, message: 'Comment was deleted' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;