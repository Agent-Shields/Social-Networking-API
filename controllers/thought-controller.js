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
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.Id })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err))
    },

    // create a new thought (push created thought's id to associated user's thoughts array field)
    createThought({ params, body }, res) {
        console.log(params)
        Thought.create(body)
            .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            )
            })
            .then(dbUserData => {
                console.log(dbUserData)
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'})
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
            
    },
    // update a thought by _id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.Id }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No Thought found with this id!" })
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
    },
    // remove a thought by _id
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.Id })
          .then(deletedThought => {
            if (!deletedThought) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $pull: { thoughts: params.Id } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },
    
    // /api/thoughts/:thoughtId/reactions

    // post create reaction stored in single thought's reactions arr field
      addReaction({ params, body }, res) {
        console.log(params);
        console.log(body);
        Thought.findOneAndUpdate(
          { _id: params.thoughtId},
          { $push: { reactions: body } },
          { new: true, runValidators: true}
        )
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!'})
            return;
          }
          res.json(dbThoughtData)
        })
        .catch(err => res.json(err))
      },
    // delete to pull and remove a reaction by reaction's reactionId value
    removeReaction({ params, body }, res) {
      console.log(params)
      console.log(body)
      Thought.findOneAndUpdate(
        { _id: params.thoughtId},
        { $pull: { reactions: body } },
        { new: true}
      )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => { res.json(err)})
    }
}

module.exports = thoughtController;