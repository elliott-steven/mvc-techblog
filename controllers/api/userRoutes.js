const router = require('express').Router();
const { Users, Posts, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all users
router.get('/', (req, res) => {
    Users.findAll({

        attributes: {
            exclude: ['password']
        }
    })
        .then(userData => res.json(userData))

        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get specific user
router.get('/:id', (req, res) => {
    Users.findOne({

        attributes: {
            exclude: ['password']
        },
        where: {
            id: req.params.id
        },
        include: [{
            model: Posts,
            attributes: ['id', 'title', 'content', 'created_at']
        },
        {
            model: Comments,
            attributes: ['id', 'comment_text', 'created_at'],
            include: {
                model: Post,
                attributes: ['title']
            }
        }
        ]
    })
        .then(userData => {
            if (!userData) {

                res.status(404).json({
                    message: 'No user found with this id'
                });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);

            res.status(500).json(err);
        });
});

// Create a user
router.post('/', (req, res) => {

    Users.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(userData => {
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;

                res.json(userData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.post('/login', (req, res) => {
    Users.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(400).json({
                    message: 'No such username!'
                });
                return;
            }

            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;

                res.json({
                    user: userData,
                    message: 'You are logged in!'
                });
            });

            const validPassword = userData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({
                    message: 'Incorrect password!'
                });
                return;
            }

            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;

                res.json({
                    user: userData,
                    message: 'You are logged in!'
                });
            });
        });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }

});

module.exports = router;