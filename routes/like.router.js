/**
 * @swagger
 * tags:
 *   name: Like
 *   description: API endpoints for managing Like/Unlike
 */

const express = require('express');
const router = express.Router();
const likeService = require('../services/like-service');
const STATUS = require("./../utils/statusCode")

/**
 * @swagger
 * /comments/{commentId}/like:
 *   post:
 *     summary: Like/Unlike a comment toggle API
 *     tags: [Like]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileLikeId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Comment liked
 *       500:
 *         description: Internal server error
 */
router.post('/comments/:commentId/like', async (req, res) => {
    try {
        const profileLikeId = req.body.profileLikeId;
        const commentId = req.params.commentId;

        const response = await likeService.likeComment(profileLikeId, commentId);
        res.status(response.status).json(response);

    } catch (error) {
        res.status(STATUS.SERVER_ERRORS.INTERNAL_SERVER_ERROR).json({error: error.message});
    }
});


module.exports = () => router;
