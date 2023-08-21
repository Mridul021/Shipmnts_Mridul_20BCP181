import {Answer} from "../model/Answer.js";

export const createAnswer = async (req, res) => {
    const {userId, questionId, description} = req.body;

    try {
        const doc = await Answer.create({userId, questionId, description});
        res.status(200).json({
            message: 'Answer Created',
            body: {
                questionId: doc._id
            },
            success: true
        })
    } catch (e) {
        res.status(500).json({
            message: e,
            success: false
        });
    }
};

export const updateAnswer = async (req, res) => {
    const {answerId, userId, questionId, description} = req.body;

    try {
        await Answer.updateOne({_id: answerId, userId, questionId}, {description});
        res.status(200).json({
            message: 'Answer Updated',
            success: true
        })
    } catch (e) {
        res.status(500).json({
            message: e,
            success: false
        });
    }
};

export const deleteAnswer = async (req, res) => {
    const {answerId} = req.body;

    try {
        await Answer.deleteOne({_id: answerId});
        res.status(200).json({
            message: 'Answer Deleted',
            success: true
        })
    } catch (e) {
        res.status(500).json({
            message: e,
            success: false
        });
    }
};

export const upVoteAnswer = async (req, res) => {
    const {answerId, userId} = req.body;

    try {
        await Answer.updateOne({_id: answerId}, { $addToSet: { upVotes: userId }});
        res.status(200).json({
            message: 'Up Vote Done',
            success: true
        })
    } catch (e) {
        res.status(500).json({
            message: e,
            success: false
        });
    }
};

export const downVoteAnswer = async (req, res) => {
    const {answerId, userId} = req.body;

    try {
        await Answer.updateOne({_id: answerId}, { $addToSet: { downVotes: userId }});
        res.status(200).json({
            message: 'Down Vote Done',
            success: true
        })
    } catch (e) {
        res.status(500).json({
            message: e,
            success: false
        });
    }
};
