const { User, Thought } = require('../models')

const thoughtController = {

    // /api/thoughts

        // get all thoughts
            getAllThoughts(req, res) {
                Thought.find({})
                .then(dbThoughtData => res.json(dbThoughtData))
                .catch(err => {
                    console.log(err)
                    res.sendStatus(400)
                })
            },
        // get single thought by _id
            getThoughtById({ params }, res){
                Thought.findOne({ _id: params.id})
                .then(dbThoughtData => res.json(dbThoughtData))
                .catch(err => res.json(err))
            },

        // create a new thought (push created thought's id to associated user's thoughts array field)
            createThought({ body }, res){ 
                Thought.create(body)
                .then(dbThoughtData => res.json(dbThoughtData))
                .catch(err => res.json(err))
            },
        // update a thought by _id
        updateThought({ params, body }, res) {
           Thought.findOneAndUpdate({ _id: params.id}, body, { new: true})
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: "No Thought found with this id!"})
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
        },
        // remove a thought by _id
        deleteThought({ params }, res) {
            User.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err))
        }

    // /api/thoughts/:thoughtId/reactions

        // post create reaction stored in single thought's reactions arr field

        // delete to pull and remove a reaction by reaction's reactionId value
}

module.exports = thoughtController;