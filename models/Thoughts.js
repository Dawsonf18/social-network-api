const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            len: (1 - 280)
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Reactions'
            }
        ]
    }
);

ReactionSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: 0
        },
        reactionBody: {
            type: String,
            required: true,
            max: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            getter: true
        }
    }
);
const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;