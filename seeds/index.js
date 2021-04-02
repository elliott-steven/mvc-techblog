
const seedPosts = require('./seed-posts');
const seedUsers = require('./seed-users');
const seedComments = require('./seed-comments');

const sequelize = require('../config/connection');

const seedAll = async () => {

    await sequelize.sync({ force: true });
    console.log('\n----- DB IS SYNCED -----\n');

    await seedUsers();
    console.log('\n----- SEEDED THE USERS -----\n');

    await seedPosts();
    console.log('\n----- SEEDED THE POSTS -----\n');

    await seedComments();
    console.log('\n----- SEEDED THE COMMENTS -----\n');

    process.exit(0);
};

seedAll();