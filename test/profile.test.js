const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js
const mongoose = require('mongoose');
const Profile = require('../models/profile');
const {profile1, profile2, profile3} = require('./data/userData');


// Example test suite for creating a new profile
describe('Create New Profile', () => {

    let profileId;

    // Test creating a new profile
    test('Create new profile', async () => {
        const response = await request(app)
            .post('/profiles')
            .send(profile1)
            .expect(201);

        await request(app)
            .post('/profiles')
            .send(profile2)
            .expect(201);

        // Check if the response contains the created profile
        expect(response.body.data.name).toBe(profile1.name);
        expect(response.body.data.description).toBe(profile1.description);

        // Save the profile ID for further tests
        profileId = response.body.data._id;
    });

    // Ensure the profile found in API
    test('2 Profile should exist in the API', async () => {
        const getprofiles = await request(app)
            .get('/profiles')
            .expect(200);
        expect(getprofiles.body.data.length).toBe(2);
    });

    // Ensure the profile API return 400 when provide wrong data
    test('Profile create API should return 400', async () => {
        await request(app)
            .post('/profiles')
            .send(profile3)
            .expect(400);
    });


    // Ensure the profile is created in the database
    test('Profile should exist in the database', async () => {
        const createdProfile = await Profile.findById(profileId);
        expect(createdProfile).toBeDefined();
    });

    // Ensure the profile is created in the database
    test('Profile page should load', async () => {
        await request(app)
            .get('/profiles/' + profileId)
            .expect(200);
    });

    // Clean up: delete the created profile after the test
    afterAll(async () => {
        await Profile.deleteMany({}); // Clean up the database
        await mongoose.disconnect(); // Close the MongoDB connection
    });
});
