/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API endpoints for managing comments
 */

const express = require('express');
const router = express.Router();
const commentService = require('../services/comment-service');
const STATUS = require("./../utils/statusCode");
const CommentFilterTransformer = require("./../transformer/commentFilter");
const GLOBALCALLBACKAPIRESPONSE = require("./../callbacks/globalRouteCallBack");
const {response} = require("express");
/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileCommentId:
 *                 type: number
 *                 description: ID of the profile who posted the comment
 *               profileId:
 *                 type: number
 *                 description: ID of the user profile the comment belongs to
 *               mbti:
 *                 type: string
 *                 enum: [INFP, INFJ, ENFP, ENFJ, INTJ, INTP, ENTP, ENTJ, ISFP, ISFJ, ESFP, ESFJ, ISTP, ISTJ, ESTP, ESTJ]
 *                 description: MBTI type of the comment
 *               enneagram:
 *                 type: string
 *                 enum: [1w2, 2w3, 3w2, 3w4, 4w3, 4w5, 5w4, 5w6, 6w5, 6w7, 7w6, 7w8, 8w7, 8w9, 9w8, 9w1]
 *                 description: Enneagram type of the comment
 *               zodiac:
 *                 type: string
 *                 enum: [Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces]
 *                 description: Zodiac type of the comment
 *               title:
 *                 type: string
 *                 description: Title of the comment
 *               comment:
 *                 type: string
 *                 description: Content of the comment
 *     responses:
 *       '201':
 *         description: New comment created
 *       '500':
 *         description: Internal server error
 */

router.post('/', async (req, res) => {
    try {
        const response = await commentService.createComment(req.body);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(STATUS.SERVER_ERRORS.INTERNAL_SERVER_ERROR).json({error: error.message});
    }
});

/**
 * @swagger
 * /comments/{profileId}:
 *   get:
 *     summary: Get a specific comment by profileId
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: String
 *           enum: [best, recent]
 *         description: The sortBy with likes or createdAt to filter comments for.
 *       - in: query
 *         name: type
 *         schema:
 *           type: String
 *           enum: [ALL, MBTI, Enneagram, Zodiac]
 *         description: The type are ALL, MBTI, Eneagram, Zodiac to filter comments for.
 *     responses:
 *       '200':
 *         description: Retrieved comment
 *       '404':
 *         description: Comment not found
 *       '500':
 *         description: Internal server error
 */

router.get('/:profileId',  (req, res) => {
    try {
        const profileId = req.params.profileId;
        const {sortBy, type} = req.query;
        const {filterQuery, sortField} = CommentFilterTransformer({sortBy: sortBy, type: type, profileId: profileId});
        commentService.filterAndSortComments({sort: sortField, query: filterQuery}, ((err,response)=>{
            return GLOBALCALLBACKAPIRESPONSE(err,response,res);
        }));
    } catch (error) {
        res.status(STATUS.SERVER_ERRORS.INTERNAL_SERVER_ERROR).json({error: error.message});
    }
});

module.exports = () => router;
