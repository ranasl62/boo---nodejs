/**
 * @swagger
 * tags:
 *   name: Utils
 *   description: Utility endpoints
 */

const express = require('express');
const router = express.Router();
const STATUS = require("./../utils/statusCode");
const GlobalResponse = require("./../response/globalResponse");
const VOTE_TYPES = require("./../utils/static-data/voteOption")
/**
 * @swagger
 * /utils/vote-options:
 *   post:
 *     summary: Get vote options
 *     tags: [Utils]
 *     responses:
 *       200:
 *         description: Vote options retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 MBTI:
 *                   type: array
 *                   items:
 *                     type: string
 *                 Enneagram:
 *                   type: array
 *                   items:
 *                     type: string
 *                 Zodiac:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Internal server error
 */

router.post('/vote-options', async (req, res) => {
    try {
        res.status(STATUS.SUCCESS.OK).json(GlobalResponse(STATUS.SUCCESS.OK, "Vote options retrieved successfully", VOTE_TYPES));
    } catch (error) {
        res.status(STATUS.SERVER_ERRORS.INTERNAL_SERVER_ERROR).json({error: error.message});
    }
});

module.exports = () => router;
