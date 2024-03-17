'use strict';

const express = require('express');
const router = express.Router();
const profileService = require('../services/profile-service');
const STATUS = require("./../utils/statusCode");

const defaultImage = '/public/static/profile.jpg';

/**
 * @swagger
 * /profiles:
 *   post:
 *     summary: Create a new profile
 *     tags: [Profiles]
 *     description: Create a new profile with the provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               mbti:
 *                 type: string
 *               enneagram:
 *                 type: string
 *               variant:
 *                 type: string
 *               tritype:
 *                 type: number
 *               socionics:
 *                 type: string
 *               temperaments:
 *                 type: string
 *               sloan:
 *                 type: string
 *               psyche:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Profile created successfully
 *       '400':
 *         description: Bad request. Invalid input data
 *       '500':
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
    try {
        const response = await profileService.profileSave({...req.body, image: defaultImage});
        res.status(STATUS.SUCCESS.OK).send(response)
    } catch (err) {
        console.error('Error saving profile:', err);
        res.status(STATUS.SERVER_ERRORS.INTERNAL_SERVER_ERROR).send(await err);
    }
});

/**
 * @swagger
 * /profiles/{id}:
 *   get:
 *     summary: Get a profile by ID
 *     tags: [Profiles]
 *     description: Retrieve profile information for the specified ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the profile to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Profile found
 *       '404':
 *         description: Profile not found
 *       '500':
 *         description: Internal server error
 */
router.get('/:id', async (req, res, next) => {
    try {
        const response = await profileService.profileGet(parseInt(req.params.id));
        if (response.status === STATUS.CLIENT_ERRORS.NOT_FOUND) {
            return res.status(STATUS.CLIENT_ERRORS.NOT_FOUND).send(response);
        }
        res.render('profile_template', {profile: response.data});
    } catch (err) {
        console.error('Error retrieving profile:', err);
        res.status(STATUS.SERVER_ERRORS.INTERNAL_SERVER_ERROR).send('Error retrieving profile');
    }
});

/**
 * @swagger
 * /profiles:
 *   get:
 *     summary: Get profiles
 *     tags: [Profiles]
 *     description: Retrieve profiles information
 *     responses:
 *       '200':
 *         description: Profile found
 *       '404':
 *         description: Profile not found
 *       '500':
 *         description: Internal server error
 */

router.get('/', async (req, res, next) => {
    try {
        const response = await profileService.profilesGet();
        if (response.status === STATUS.CLIENT_ERRORS.NOT_FOUND) {
            return res.status(STATUS.CLIENT_ERRORS.NOT_FOUND).send(response);
        }
      res.status(STATUS.SUCCESS.OK).send(response);
    } catch (err) {
        console.error('Error retrieving profile:', err);
        res.status(STATUS.SERVER_ERRORS.INTERNAL_SERVER_ERROR).send('Error retrieving profile');
    }
});

module.exports = () => router;

