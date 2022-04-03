const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: 'username required!'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
)

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'Thought must contain text!',
        minLength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        // user that created this thought 
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
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
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

// create Thought model using ThoughtSchema
const Thought = model('Thought', ThoughtSchema)

// export Thought model
module.exports = Thought;