# 🎬 StreamHub Backend

A production-ready RESTful Backend inspired by **YouTube**, built with **Node.js**, **Express.js**, and **MongoDB**. The project follows the **MVC Architecture** and provides secure APIs for user authentication, video management, comments, likes, playlists, subscriptions, tweets, and watch history.

---

# 📖 Overview

This project is a complete backend server for a video-sharing platform similar to YouTube. It exposes REST APIs that can be consumed by any frontend application (React, Angular, Vue, Flutter, etc.).

The backend includes secure authentication using JWT, password hashing with bcrypt, media storage on Cloudinary, file uploads using Multer, and MongoDB for persistent data storage.

---

# 🎯 Problem Statement

Modern video-sharing platforms require a scalable backend capable of handling:

- User Authentication
- Video Upload & Storage
- Comments & Replies
- Likes & Dislikes
- Playlist Management
- Channel Subscription
- Tweet/Community Posts
- Watch History
- Secure REST APIs
- Cloud File Storage

This project provides all of these functionalities through well-structured REST APIs.

---

# 🚀 Features

## 👤 User Management

- User Registration
- Login & Logout
- JWT Authentication
- Refresh Token
- Change Password
- Update Profile
- Update Avatar
- Update Cover Image
- Watch History

---

## 🎥 Video Management

- Upload Video
- Update Video
- Delete Video
- Publish / Unpublish Video
- Get Single Video
- Get All Videos
- Search Videos

---

## 💬 Comments

- Add Comment
- Edit Comment
- Delete Comment
- View Comments

---

## ❤️ Likes

- Like Video
- Unlike Video
- Like Comment
- Like Tweet

---

## 📂 Playlist

- Create Playlist
- Update Playlist
- Delete Playlist
- Add Video
- Remove Video

---

## 📺 Subscription

- Subscribe Channel
- Unsubscribe Channel
- View Subscribers
- View Subscribed Channels

---

## 🐦 Tweets

- Create Tweet
- Update Tweet
- Delete Tweet
- View Tweets

---

# 🏗️ Project Architecture

```
              Client
                 │
                 ▼
          Express Routes
                 │
                 ▼
           Middlewares
  (JWT • Multer • CORS • Cookies)
                 │
                 ▼
           Controllers
      (Business Logic Layer)
                 │
                 ▼
             Models
         (Mongoose ODM)
                 │
                 ▼
             MongoDB
```

---

# 📂 Folder Structure

```
streamhub-backend/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── db/
│   ├── constants/
│   ├── app.js
│   └── index.js
│
├── public/
│
├── package.json
│
└── README.md
```

---

# ⚙️ Tech Stack

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JWT (Access Token)
- Refresh Token
- bcrypt

### File Upload

- Multer
- Cloudinary

### Utilities

- dotenv
- Cookie Parser
- CORS

---

# 🔄 Complete Project Workflow

## 1️⃣ User Registration

```
Client
│
▼
POST /register
│
▼
Multer Upload
│
▼
Validate Input
│
▼
Check Existing User
│
▼
Upload Avatar → Cloudinary
│
▼
Hash Password
│
▼
Save User → MongoDB
│
▼
Success Response
```

---

## 2️⃣ User Login

```
Client
│
POST /login
│
▼
Find User
│
▼
Compare Password
│
▼
Generate Access Token
│
▼
Generate Refresh Token
│
▼
Store Cookies
│
▼
Return User Details
```

---

## 3️⃣ Video Upload

```
Client
│
Upload Video
│
▼
Multer
│
▼
Upload Video → Cloudinary
│
▼
Store Video URL
│
▼
Save Metadata
│
▼
MongoDB
│
▼
Response
```

---

## 4️⃣ Protected API Request

```
Client
│
JWT Token
│
▼
verifyJWT Middleware
│
▼
Token Verified
│
▼
Controller
│
▼
MongoDB
│
▼
Response
```

---

# 🔐 Authentication Flow

StreamHub uses **JWT Authentication**.

### Access Token

- Short-lived token
- Used to access protected routes

### Refresh Token

- Long-lived token
- Generates a new Access Token

### Password Security

- Passwords hashed using bcrypt
- Passwords are never stored as plain text

---

# ☁️ Cloudinary Integration

Instead of storing media files on the server, all images and videos are uploaded to **Cloudinary**.

### Benefits

- Reduced server storage
- Faster CDN delivery
- Secure media storage
- Easy media management
- High availability

---

# 🗄️ Database Models

The application uses the following MongoDB collections:

- User
- Video
- Comment
- Like
- Playlist
- Subscription
- Tweet

---

# 🧩 Middlewares

- JWT Authentication
- Multer File Upload
- Cookie Parser
- CORS
- JSON Parser
- Error Handler

---

# 📌 API Request Lifecycle

```
Client
│
HTTP Request
│
▼
Express Route
│
▼
Middleware
│
▼
Controller
│
▼
Model
│
▼
MongoDB
│
▼
JSON Response
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone <repository-url>
cd streamhub-backend
```

## Install Dependencies

```bash
npm install
```

## Create Environment File

Create a `.env` file in the root directory.

Example:

```env
PORT=8000

MONGODB_URI=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

CORS_ORIGIN=http://localhost:3000
```

## Run Development Server

```bash
npm run dev
```

---

# 📚 API Modules

- Authentication
- User
- Video
- Comments
- Likes
- Playlist
- Subscription
- Tweets

---

# 📈 Future Improvements

- Redis Caching
- Docker Support
- Swagger Documentation
- Unit Testing
- Integration Testing
- Notification System
- Recommendation Engine
- Video Streaming
- Rate Limiting
- Logging & Monitoring

---

# ⭐ Learning Outcomes

This project demonstrates practical implementation of:

- REST API Development
- MVC Architecture
- JWT Authentication
- MongoDB Database Design
- Mongoose ODM
- Secure Password Hashing
- Cloudinary Integration
- Multer File Upload
- Authentication Middleware
- CRUD Operations
- Error Handling
- Scalable Backend Design
- Express Routing
- Middleware Pipeline
- Cookie-based Authentication

---

# 📌 Conclusion

StreamHub's backend closely resembles the architecture used in professional production applications. It demonstrates how secure authentication, cloud storage, modular architecture, REST APIs, and database design work together to build a scalable video-sharing platform.

It serves as an excellent learning project for understanding backend development and is well-suited for showcasing Node.js, Express.js, MongoDB, and API design skills in interviews and on GitHub.