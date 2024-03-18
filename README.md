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
![web view - localhost:3000/profiles/:id](https://awesomescreenshot.s3.amazonaws.com/image/5213829/46841445-fea3e130f72049f3cb98e83a3d24968b.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20240318%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240318T095315Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=1e1233caa4d86f13ffaa0e9870744d416be0a4093bd4cc29d877a520eeef85e8)
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
![Swagger](https://awesomescreenshot.s3.amazonaws.com/image/5213829/46841275-577b365f46eeeb8b55e698087dd16a7f.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20240318%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240318T095019Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=57ab9c600924bd8f5cead9c50d9bc307f642e49c5416ab0beeb288faf6ab8113)
## Testing
To run tests for the API, use the following command:
```bash
npm test
```

**License**

This project is licensed under the MIT License. Feel free to modify and distribute it as per your requirements.

For more details, refer to the Swagger Documentation or explore the codebase.