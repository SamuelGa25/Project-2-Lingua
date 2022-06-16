

// Use the proper HTTP status codes like 400, 404, and 500 to indicate errors in a request.
const router = require('express').Router();
const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth');



// GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    User.findAll({
        // not return the password column 
        attributes: { exclude: ['password'] }
    })
        // Sequelize is a JavaScript Promise-based library, meaning we get to use .then() with all of the model methods!
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    console.log('==================');
    // SELECT * FROM users WHERE id = 1
    User.findOne({
        // not return the password column
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'content', 'created_at']
            },
            //     // include the Comment model here:
            //     {
            //         model: Comment,
            //         attributes: ['id', 'comment_text', 'created_at'],
            //         include: {
            //             model: Post,
            //             attributes: ['title']
            //         }
            //     }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST create a user /api/users
// !SIGN UP
router.post('/signup', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        // This gives our server easy access to the user's user_id, username, and a Boolean describing whether or not the user is logged in.
        .then(dbUserData => {
            req.session.save(() => {
                // declare session variables
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
                //   run the callback function
                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.post('/login', (req, res) => {

    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {

                res.status(400).json({ message: 'No user with that email address!' });
                return;
            }

            // Verify user
            const validPassword = dbUserData.checkPassword(req.body.password);
            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }
            req.session.save(() => {
                // declare session variables
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({ user: dbUserData, message: 'You are now logged in!' });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//  /logout route
// LOGOUT A USER
router.post('/logout', withAuth, (req, res) => {
    // if user logged in and session has it to true, delete the session
    if (req.session.loggedIn) {
        // to delete the session
        req.session.destroy(() => {
            // 204 No Content
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});



// PUT /api/users/1
// UPDATE A USER
router.put('/:id', withAuth, (req, res) => {

    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/users/1
// DELETE A USER
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json({ trueOrFalse: dbUserData, message: 'User deleted successfully' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
