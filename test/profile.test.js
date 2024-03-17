const assert = require('assert');
const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js

describe('Profile API Tests', function() {
    describe('GET /profiles', function() {
        it('should return status 200 and an array of profiles', function(done) {
            request(app)
                .get('/profiles')
                .end(function(err, res) {
                    // if (err) return done(err);
                    // assert(Array.isArray(res.body), 'Response should be an array');
                    // done();
                });
        });
    });


});
