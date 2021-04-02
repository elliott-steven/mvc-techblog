const router = require('express').Router();
const { Users, Posts, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts
router.get("/", (req, res) => {
    Posts.findAll({

        attributes: ["id", "content", "title", "created_at"],
        order: [
            ["created_at", "DESC"]
        ],

        include: [{
            model: Users,
            attributes: ["username"],
        },
        {
            model: Comments,
            attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
            include: {
                model: Users,
                attributes: ["username"],
            },
        },
        ],
    })
        .then((postData) => res.json(postData))

        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get a single post
router.get("/:id", (req, res) => {
    Posts.findOne({

        where: {
            id: req.params.id,
        },
        attributes: ["id", "content", "title", "created_at"],
        include: [{
            model: Users,
            attributes: ["username"],
        },
        {
            model: Comments,
            attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
            include: {
                model: Users,
                attributes: ["username"],
            },
        },
        ],
    })

        .then((postData) => {
            if (!postData) {

                res.status(404).json({
                    message: "No post found with this id"
                });
                return;
            }
            res.json(postData);
        })
        .catch((err) => {

            console.log(err);
            res.status(500).json(err);
        });
});

// Create a post
router.post("/", withAuth, (req, res) => {
    console.log("creating");

    Posts.create({
        title: req.body.title,
        content: req.body.post_content,
        user_id: req.session.user_id
    })

        .then((postData) => res.json(postData))

        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Update a post
router.put("/:id", withAuth, (req, res) => {
    Posts.update({

        title: req.body.title,
        content: req.body.post_content,
    }, {
        where: {
            id: req.params.id,
        },
    })

        .then((postData) => {
            if (!postData) {
                res.status(404).json({
                    message: "No post found with this id"
                });
                return;
            }
            res.json(postData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Delete a post
router.delete("/:id", withAuth, (req, res) => {
    Posts.destroy({

        where: {
            id: req.params.id,
        },
    })
        .then((postData) => {
            if (!postData) {
                res.status(404).json({
                    message: "No post found with this id"
                });
                return;
            }
            res.json(postData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;