const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js
const mongoose = require('mongoose');
const Profile = require('../models/profile');

// Example test suite for creating a new profile
describe('Create New Profile', () => {
    let profileId;

    // Test creating a new profile
    test('Create new profile', async () => {
        const newProfileData = {
            "name": "John Doe",
            "description": "Software Engineer",
            "mbti": "INTJ",
            "enneagram": "5w6",
            "variant": "Social",
            "tritype": 531,
            "socionics": "LII",
            "temperaments": "Analytical",
            "sloan": "RLUE",
            "psyche": "Analytical"
        };

        const newProfileData2 = {
            "description": "Software Engineer",
            "mbti": "INTssJ",
            "enneagram": "5ssw6",
            "variant": "Social",
            "tritype": 531,
            "socionics": "LII",
            "temperaments": "Analytical",
            "sloan": "RLUE",
            "psyche": "Analytical"
        };

        const response = await request(app)
            .post('/profiles')
            .send(newProfileData)
            .expect(201);

        // Check if the response contains the created profile
        expect(response.body.data.name).toBe(newProfileData.name);
        expect(response.body.data.description).toBe(newProfileData.description);

        // Save the profile ID for further tests
        profileId = response.body.data._id;
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
        // Delete the created profile from the database
        await Profile.findByIdAndDelete(profileId);
        // Close the MongoDB connection
        await mongoose.connection.close();
    });
});
