# NoSQL Social Network API (Module 17 Challenge)

## Overview
A RESTful API for a social network web application using Express.js, MongoDB, and Mongoose (TypeScript). Users can share thoughts, react to friends' thoughts, and manage a friend list. All data is stored in MongoDB, and all endpoints are tested via Insomnia.

## Getting Started
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start MongoDB** (locally or with Atlas).
3. **Run the server:**
   ```bash
   npm run dev
   # or to build and run compiled JS
   npm run build
   npm start
   ```

## API Endpoints
### Users
- `GET /api/users` — Get all users (with thoughts and friends populated)
- `GET /api/users/:userId` — Get a single user by ID (with thoughts and friends)
- `POST /api/users` — Create a new user
- `PUT /api/users/:userId` — Update a user by ID
- `DELETE /api/users/:userId` — Delete a user and their thoughts
- `POST /api/users/:userId/friends/:friendId` — Add a friend
- `DELETE /api/users/:userId/friends/:friendId` — Remove a friend

### Thoughts
- `GET /api/thoughts` — Get all thoughts
- `GET /api/thoughts/:thoughtId` — Get a single thought by ID
- `POST /api/thoughts` — Create a new thought (and push to user's thoughts array)
- `PUT /api/thoughts/:thoughtId` — Update a thought by ID
- `DELETE /api/thoughts/:thoughtId` — Delete a thought (and remove from user's thoughts array)

### Reactions (subdocument of Thought)
- `POST /api/thoughts/:thoughtId/reactions` — Add a reaction to a thought
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` — Remove a reaction from a thought

## Data Models
- **User:** username, email, thoughts (array), friends (array), virtual `friendCount`
- **Thought:** thoughtText, createdAt (formatted), username, reactions (array), virtual `reactionCount`
- **Reaction:** reactionId, reactionBody, username, createdAt (formatted)

## Notes
- All timestamps are formatted as locale strings in API responses.
- Deleting a user also deletes their associated thoughts.
- All endpoints return JSON.

---
© 2025 Christopher Lin. Bootcamp Module 17 NoSQL Challenge.
