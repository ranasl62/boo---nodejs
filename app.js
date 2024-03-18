'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require('mongoose');
const path = require('path');
const Profile = require('./models/profile');

// Create a new instance of express
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Define CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Adjust the origin as needed
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// set the view engine to ejs
app.set('view engine', 'ejs');

// Define a route to serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// routes
app.use('/profiles', require('./routes/profile.router')());
app.use('/comments', require('./routes/comment.router')());
app.use('/', require('./routes/like.router')());
app.use('/utils', require('./routes/utils.router')());
app.use('/api-docs', require('./routes/swagger.router')());

let mongoServer;
const mongoServerOpts = {
    autoStart: false, // Don't automatically start MongoDB instance
};

(async () => {
    mongoServer = new MongoMemoryServer(mongoServerOpts);
    await mongoServer.start(); // Start the MongoDB instance
    const mongoUri = mongoServer.getUri(); // Get the URI only after the server is started
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
})();
// start server
const server = app.listen(port);

console.log('Express started. Listening on %s', port, server);


module.exports=app;