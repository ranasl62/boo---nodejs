const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const express = require('express');
const path = require('path');
const router = express.Router();

module.exports = function () {
    const options = {
        definition: {
            openapi: "3.1.0",
            info: {
                title: "Boo Profile, Comments, Like API",
                version: "0.1.0",
                description: "This is a simple CRUD API application made with Express and documented with Swagger",
                contact: {
                    name: "Md Rana Hossain",
                    url: "https://ranasl62.com",
                    email: "ranasl62@email.com",
                },
            },
            servers: [
                {
                    url: "http://localhost:3000",
                },
            ],
        },
        apis: [path.join(__dirname, '../routes/**/*.js')], // Adjust the path to match your route file structure
    };

    const specs = swaggerJsdoc(options);

    router.use(
        "/",
        swaggerUi.serve,
        swaggerUi.setup(specs, { explorer: true })
    );

    return router;
};
