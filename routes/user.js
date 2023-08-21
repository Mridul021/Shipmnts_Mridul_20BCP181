import express from "express";
import {register, login, profile, logout} from '../controller/user.js';
import {
    createQuestion,
    deleteQuestion,
    downVoteQuestion,
    getAllQuestions, searchQuestion,
    updateQuestion,
    upVoteQuestion
} from "../controller/Question.js";
import {createAnswer, deleteAnswer, downVoteAnswer, updateAnswer, upVoteAnswer} from "../controller/Answer.js";

const router = express.Router();

router.post('/user/create',register);

router.get('/question/all', getAllQuestions);
router.post('/question/search', searchQuestion);
router.post('/question/create', createQuestion);
router.post('/question/update', updateQuestion);
router.post('/question/upVote', upVoteQuestion);
router.post('/question/downVote', downVoteQuestion);
router.delete('/question/delete', deleteQuestion);

router.post('/answer/create', createAnswer);
router.post('/answer/update', updateAnswer);
router.post('/answer/upVote', upVoteAnswer);
router.post('/answer/downVote', downVoteAnswer);
router.delete('/answer/delete', deleteAnswer);

router.post('/login',login);
router.post('/logout',logout);

export default router;
