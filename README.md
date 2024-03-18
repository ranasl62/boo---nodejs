# Boo Profile, Comments, Like API

This is a simple CRUD API application built with Express.js and MongoDB, providing endpoints for managing user profiles, comments, and likes. The API is documented using Swagger for easy reference and understanding.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)

## Overview
The Boo Profile, Comments, Like API is designed to facilitate the management of user profiles, comments, and likes within an application. It allows users to perform CRUD operations on profiles, post comments on profiles, and like/unlike comments.

## Features
- Create, read, update, and delete user profiles.
- Post comments on user profiles.
- Like and unlike comments.
- Documented using Swagger for easy API exploration and understanding.

## Setup
To set up and run the Boo Profile, Comments, Like API locally, follow these steps:

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Start the development server using `npm start`.

## Usage
Once the server is running, you can access the API endpoints through `http://localhost:3000`. Use tools like Postman or Swagger UI to interact with the API and perform CRUD operations on profiles, comments, and likes.

## API Endpoints
The following API endpoints are available:

- **Profiles**
    - `POST /profiles`: Create a new profile.
    - `GET /profiles/:id`: Get a profile by ID.
    - `GET /profiles`: Get all profiles.

- **Comments**
    - `POST /comments`: Create a new comment.
    - `GET /comments/:profileId`: Get comments for a specific profile with filter or without filter.

- **Likes**
    - `POST /comments/:commentId/like`: Like/Unlike a comment.

- **Utility**
    - `POST /utils/vote-options`: Get vote options (MBTI, Enneagram, Zodiac).

- **Swagger Documentation**
    - `GET /api-docs`: Swagger documentation for the API.

## Testing
To run tests for the API, use the following command:
```bash
npm test
```

**License**

This project is licensed under the MIT License. Feel free to modify and distribute it as per your requirements.

For more details, refer to the Swagger Documentation or explore the codebase.