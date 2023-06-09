const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/,
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true, 
        }
    });

userSchema.virtual('friendCount').
get(function() { return this.friends.length}).
set(function (v) {
    const friendCount = v;
    this.set({ friendCount })
})

const User = model('user', userSchema);

module.exports = User;