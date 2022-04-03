const { User, Thought } = require('../models')

const userController = {
    // /api/users

        // get all users
            getAllUsers(req, res) {
                User.find({})
                .then(dbUserData => res.json(dbUserData))
                .catch(err => {
                    console.log(err);
                    res.sendStatus(400)
                });
            },
        // get single user by _id and poplated thought and friend data

        // post a new user
            createUser({ body }, res) {
                User.create(body)
                .then(dbUserData => res.json(dbUserData))
                .catch(err => res.json(err))
            }
        // update a user by _id

        // delete a user by _id

    // /api/users/:userId/friends/:friendId
    
        // post to add new friend to user's friend list

        // Delete to remove friend from user's friend list
}

module.exports = userController;