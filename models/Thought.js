const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'Thought must contain text!',
        minLength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
        // getter method to format timestamp on query
    },
    username: {
        // user that created this thought 
        type: String,
        required: true
    }
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Thought virtual for reaction count
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

// create Thought model using ThoughtSchema
const Thought = model('Thought', ThoughtSchema)

// export Thought model
module.exports = Thought;