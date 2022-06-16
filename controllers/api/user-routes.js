

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
router.post('/', (req, res) => {
    //     INSERT INTO users
    //   (username, email, password)
    // VALUES
    //   ("Lernantino", "lernantino@gmail.com", "password1234");

    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        // This gives our server easy access to the user's user_id, username, and a Boolean describing whether or not the user is logged in.
        .then(dbUserData => {
            // We want to make sure the session is created before we send the response back, so we're wrapping the variables in a callback. The req.session.save() method will initiate the creation of the session and then run the callback function once complete.
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

// In this case, a login route could've used the GET method since it doesn't actually create or insert anything into the database. But there is a reason why a POST is the standard for the login that's in process.

// A GET method carries the request parameter appended in the URL string, whereas a POST method carries the request parameter in req.body, which makes it a more secure way of transferring data from the client to the server. Remember, the password is still in plaintext, which makes this transmission process a vulnerable link in the chain.
router.post('/login', (req, res) => {
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    // We queried the User table using the findOne() method for the email entered by the user and assigned it to req.body.email.
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            // If the user with that email was not found, a message is sent back as a response to the client. However, if the email was found in the database, the next step will be to verify the user's identity by matching the password from the user and the hashed password in the database. This will be done in the Promise of the query.
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }
        // add comment syntax in front of this line in the .then()
        // res.json({ user: dbUserData }

        // Verify user
        const validPassword = dbUserData.checkPassword(req.body.password);
        // In the conditional statement above, if the match returns a false value, an error message is sent back to the client, and the return statement exits out of the function immediately.
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        // We want to make sure the session is created before we send the response back, so we're wrapping the variables in a callback. The req.session.save() method will initiate the creation of the session and then run the callback function once complete.
        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            //   run the callback function
            //   However, if there is a match, the conditional statement block is ignored, and a response with the data and the message "You are now logged in." is sent instead. 13.2

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});
//  /logout route
router.post('/logout', withAuth, (req, res) => {
    // to delete the session
    // if user logged in and session has it to true, delete the session
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            // 204 No Content
            res.status(204).end();
        });
    }
    else {
        // session not loggedIn 
        res.status(404).end();
    }
});



// PUT /api/users/1
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
