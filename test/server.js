const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js
module.exports = request(app);