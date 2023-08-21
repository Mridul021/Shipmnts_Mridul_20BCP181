import mongoose from "mongoose";

const {Schema, model} = mongoose;

const UserScheme = new Schema({
    userId: {type: Schema.ObjectId, required: true},
    title: {type: String, required: true, min: 4},
    description: {type: String, required: true, min: 4},
    comments: [{
        userId: {type: Schema.ObjectId, required: true},
        description: {type: String, required: true},
    }],
    upVotes: [String],
    downVotes: [String],
})

export const Question = model('Question', UserScheme);
