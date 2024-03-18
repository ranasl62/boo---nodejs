const request = require('supertest');
const app = require('../app');
const Like = require("./../models/like");
const Comment = require("./../models/comment");
const {profile1, profile2, profile3} = require('./data/userData');
const {comment1, comment2, comment3, comment4, comment5} = require('./data/commentData');
const Profile = require("../models/profile");

describe('User Interaction Tests', () => {
    let comment;
    // Create profiles before creating comments
    beforeAll(async () => {
        await Profile.insertMany([profile1, profile2]);
    });

    test('Create associated comments', async () => {
        // Create comments associated with users
        const createComment1 = await request(app)
            .post('/comments')
            .send(comment1);
        const createComment2 = await request(app)
            .post('/comments')
            .send(comment2);
        const createComment5 = await request(app)
            .post('/comments')
            .send(comment5);

        // Check if comments are created successfully
        expect(createComment1.status).toBe(201);
        expect(createComment2.status).toBe(201);
        expect(createComment5.status).toBe(400); // Invalid data should fail
    });

    test('Like comment by user', async () => {
        // Like a comment by a user
        comment = await Comment.findOne();
        const commentId = comment._id; // ID of the comment to like
        const userId = 1; // ID of the user liking the comment

        const likeComment = await request(app)
            .post(`/comments/${commentId}/like`)
            .send({profileLikeId: userId});

        // Check if the comment is liked successfully
        expect(likeComment.status).toBe(200);
    });

    test('Count likes', async () => {
        comment = await Comment.findOne();
        // Count likes for a comment
        const commentId = comment._id; // ID of the comment to count likes for

        await request(app)
            .post(`/comments/${commentId}/like`)
            .send({profileLikeId: profile2._id})
            .expect(200);

        const checkLikeTable = await Like.find({profileLikeId: profile2._id, commentId});

        // Check if the likes are counted correctly
        expect(checkLikeTable.length).toBe(1); // Assuming one like is added


        await request(app)
            .post(`/comments/${commentId}/like`)
            .send({profileLikeId: profile2._id})
            .expect(200);

        const checkLikeTable2 = await Like.find({profileLikeId: profile2._id, commentId});

        // Check if the likes are counted correctly
        expect(checkLikeTable2.length).toBe(0); // Assuming one unlike is added

    });

});
