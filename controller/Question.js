import {Question} from "../model/Question.js";

export const createQuestion = async (req, res) => {
    const {userId, title, description} = req.body;

    try {
        const doc = await Question.create({userId, title, description});
        res.status(200).json({
            message: 'Question Created',
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

export const updateQuestion = async (req, res) => {
    const {questionId, userId, title, description} = req.body;

    try {
        await Question.updateOne({_id: questionId, userId}, {title, description});
        res.status(200).json({
            message: 'Question Updated',
            success: true
        })
    } catch (e) {
        res.status(500).json({
            message: e,
            success: false
        });
    }
};

export const deleteQuestion = async (req, res) => {
    const {questionId} = req.body;

    try {
        await Question.deleteOne({_id: questionId});
        res.status(200).json({
            message: 'Question Deleted',
            success: true
        })
    } catch (e) {
        res.status(500).json({
            message: e,
            success: false
        });
    }
};

export const upVoteQuestion = async (req, res) => {
    const {questionId, userId} = req.body;

    try {
        await Question.updateOne({_id: questionId}, { $addToSet: { upVotes: userId }});
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

export const downVoteQuestion = async (req, res) => {
    const {questionId, userId} = req.body;

    try {
        await Question.updateOne({_id: questionId}, { $addToSet: { downVotes: userId }});
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


export const getAllQuestions = async (req, res) => {

    try {
        const docs = await Question.aggregate([{
            $addFields: {
                upVotes: { $size: "$upVotes" },
                downVotes: { $size: "$downVotes" },
            }
        }])
        res.status(200).json({
            body: docs,
            success: true
        })
    } catch (e) {
        res.status(500).json({
            message: e,
            success: false
        });
    }
};

export const searchQuestion = async (req, res) => {
    const {searchString} = req.body;

    try {
        const docs = await Question.aggregate([{
            $match: { title : { $regex: searchString, $options: 'i' } }
        }, {
            $addFields: {
                upVotes: { $size: "$upVotes" },
                downVotes: { $size: "$downVotes" },
            }
        }, {
            $sort: {
                upVotes : -1
            }
        }])
        res.status(200).json({
            body: docs,
            success: true
        })
    } catch (e) {
        res.status(500).json({
            message: e,
            success: false
        });
    }
};
