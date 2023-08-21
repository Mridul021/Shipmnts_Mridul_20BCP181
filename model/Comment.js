import mongoose from "mongoose";

const {Schema, model} = mongoose;

const UserScheme = new Schema({
    userId: {type: Schema.ObjectId, required: true},
    type: {type: Schema.ObjectId, required: true},
    description: {type: String, required: true, min: 4},
    upVotes: [String],
    downVotes: [String],
})

export const Comment = model('Comment', UserScheme);
