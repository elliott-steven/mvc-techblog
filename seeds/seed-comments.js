const { Comments } = require('../models');

const commData = [
    {
        user_id: 1,
        post_id: 5,
        comment_text: "Wow, what is happening?!"
    },
    {
        user_id: 4,
        post_id: 4,
        comment_text: "Amazing work!"
    },
    {
        user_id: 1,
        post_id: 4,
        comment_text: "Nice project! Who contributed?"
    },
    {
        user_id: 3,
        post_id: 5,
        comment_text: "We'll reach a million subscribers in no time!"
    },
    {
        user_id: 3,
        post_id: 2,
        comment_text: "More! Keep it coming!"
    },

]

const seedComments = () => Comments.bulkCreate(commData);

module.exports = seedComments;