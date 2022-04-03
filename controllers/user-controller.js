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
            getUserById({ params }, res) {
                User.findOne({ _id: params.id})
                .then(dbUserData => res.json(dbUserData))
                .catch(err => res.json(err))
            },

        // post a new user
            createUser({ body }, res) {
                User.create(body)
                .then(dbUserData => res.json(dbUserData))
                .catch(err => res.json(err))
            },
        // update a user by _id
            updateUser({ params, body }, res) {
                User.findOneAndUpdate({ _id: params.id}, body, { new: true})
                .then(dbUserData => {
                    if(!dbUserData) {
                        res.status(404).json({ message: "No User found with this id!"})
                        return;
                    }
                    res.json(dbUserData)
                })
                .catch(err => res.json(err))
            },
        // delete a user by _id
            deleteUser({ params }, res) {
                User.findOneAndDelete({ _id: params.id })
                .then(dbUserData => res.json(dbUserData))
                .catch(err => res.json(err))
            }
    // /api/users/:userId/friends/:friendId
    
        // post to add new friend to user's friend list

        // Delete to remove friend from user's friend list
}

module.exports = userController;