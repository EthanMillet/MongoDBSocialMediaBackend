const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
          },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        }
    }

)

thoughtSchema.virtual('reactionCount').
get(function() { return this.reactions.length}).
set(function (v) {
    const reactionCount = v;
    this.set({ reactionCount })
})


const Thought = model('thought', thoughtSchema);

module.exports = Thought;