const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: 'Username is required!',
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: 'Email is required!',
        unique: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid e-mail address!']
    },
    thoughts: [
        // arr _id values ref Thought model
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        //arr _id values ref User model (Self reference)
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
)

// User virtual for friend count 
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length
})

// create User model using the UserSchema
const User = model('User', UserSchema);

// export User model
module.exports = User;