const { Posts } = require('../models');

const postsData = [
    {
        title: "Taco Bell",
        post_content: "Taco Bell is known for using humor throughout their marketing and advertising, and their social media accounts are no different. From witty one-liners to clever photo updates, Taco Bell's Facebook and Twitter presence is sure to make you crack a smile -- even when they just tweet a whole bunch of taco emojis and call it a day.",
        user_id: 3
    },
    {
        title: "Charmin'",
        post_content: "You mean the toilet paper company? Darn tootin'! Serving as the original inspiration for this post, Charmin's Twitter presence is definitely a must-follow. Just check out the following series of tweets to see what we mean. Charmin is a great example of a brand whose humor aligns with the products it sells.",
        user_id: 1
    },
    {
        title: "Old Spice",
        post_content: "Old Spice is known for their funny -- and often ridiculous -- marketing content. And what better place to let their freak flag fly than on social media? Just take a look at their 'About' descriptions on Twitter, as well as a few of the silly posts to Twitter and Facebook below. (My favorite might be their making fun of Twitter polls.)",
        user_id: 2

    },
    {
        title: "Mars Curiosity (NASA)",
        post_content: "As in, the lunar rover. These NASA-run social media accounts feature sassy, first-person updates from the rover itself, who incorporates funny pop culture references and a bold attitude. And, oh yeah -- its Twitter account has more than 2.2 million followers, and its Facebook page has over 1.1 million fans. Not too shabby, NASA.",
        user_id: 5
    },

]

const seedPosts = () => Posts.bulkCreate(postsData);

module.exports = seedPosts;