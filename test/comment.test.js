const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js
const mongoose = require('mongoose');
const Profile = require('../models/profile');
const Comment = require('../models/comment');
const { profile1, profile2 } = require('./data/userData');
const { comment1, comment5 } = require('./data/commentData');
// Example test suite for creating comments
describe('Create New Comments', () => {
    let commentId = null;

    // Create profiles before creating comments
    beforeAll(async () => {
        await Profile.insertMany([profile1, profile2]);
    });

    // Test creating new comments
    test('Create new comments', async () => {
        const createComment = await request(app)
            .post('/comments')
            .send(comment1);
        console.log(createComment.body.data)

        expect(createComment.body.data).toBeDefined();
        commentId = createComment.body.data._id;
    });

    // Test creating comment with invalid data
    test('Create comments with invalid data', async () => {
        await request(app)
            .post('/comments')
            .send(comment5)
            .expect(400);
    });

    // Ensure the comment is created in the database
    test('Comment should exist in the database', async () => {
        const createdComment = await Comment.findById(commentId);
        expect(createdComment).toBeDefined();
    });

    // Ensure the comment data can be retrieved
    test('Comment data should load', async () => { // later we will add filter test
        const resposnse = await request(app)
            .get('/comments/' + profile2._id)
            .expect(200);
        console.log(resposnse.body.data)

    });

    // Clean up: delete the created comment after the test
    afterAll(async () => {
        // Delete the created comment from the database
        await Comment.findByIdAndDelete(commentId);
        // Close the MongoDB connection
        await mongoose.connection.close();
    });
});
