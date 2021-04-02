const { Users } = require('../models');

const userData = [
    {
        username: "dan_coleman",
        github: "dcoleman",
        email: "dan_coleman@test.com",
        password: "p@ssword1"
    },
    {
        username: "mark_magic",
        github: "mmagic",
        email: "mark_magic@test.com",
        password: "p@ssword2"
    },
    {
        username: "jacob_d",
        github: "jacob_b",
        email: "jacob_b@test.com",
        password: "p@ssword3"
    },
    {
        username: "stephanie_u",
        github: "steph_u",
        email: "stephanie_u@test.com",
        password: "p@ssword4"
    },
    {
        username: "malcolm_x",
        github: "malcX",
        email: "malcolm_x@test.com",
        password: "p@ssword5"
    },
]

const seedUsers = () => Users.bulkCreate(userData);

module.exports = seedUsers;