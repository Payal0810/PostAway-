# 🌐 Postaway – Social Media Backend

### A full-featured backend for a social media platform built with **Node.js, Express.js, and MongoDB**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

---

## 📖 Overview

**Postaway** is a backend API for a social media application where users can:

- Register and log in securely
- Create and manage posts
- Comment and like posts
- Send, accept, or reject friend requests
- View friend lists and pending requests

This project demonstrates **authentication, authorization, CRUD operations, and relational data handling** using MongoDB.

---

## 🧠 Features

### 👤 User Management

- Register & login with JWT-based authentication
- Update profile details
- Secure password storage with **bcrypt**

### 📝 Post System

- Create, read, update, and delete posts
- Each post includes caption, image, and user reference
- Access control: only the post owner can modify or delete

### 💬 Comment System

- Add, edit, and delete comments on posts
- Only the **commenter** or **post owner** can delete/update comments
- Populated with user info when fetched

### ❤️ Like System

- Like/unlike posts (toggle functionality)
- Get total like count for each post
- Populated with user info

### 🤝 Friendship System

- Send, accept, and reject friend requests
- Get a user’s friends and pending requests
- Friendship status handled via `"pending"`, `"accepted"`, and `"rejected"`

---

## 🧩 Tech Stack

| Layer                 | Technology                   |
| --------------------- | ---------------------------- |
| Runtime               | Node.js                      |
| Framework             | Express.js                   |
| Database              | MongoDB (Mongoose ODM)       |
| Authentication        | JWT                          |
| Password Hashing      | bcrypt                       |
| Environment Variables | dotenv                       |
| Email (optional)      | Nodemailer (for OTP feature) |

---

## 🗂️ Project Structure

Postaway/
│
├── controllers/
│ ├── userController.js
│ ├── postController.js
│ ├── commentController.js
│ ├── likeController.js
│ └── friendshipController.js
│
├── models/
│ ├── userModel.js
│ ├── postModel.js
│ ├── commentModel.js
│ ├── likeModel.js
│ └── friendshipModel.js
│
├── routes/
│ ├── userRoutes.js
│ ├── postRoutes.js
│ ├── commentRoutes.js
│ ├── likeRoutes.js
│ └── friendshipRoutes.js
│
├── middlewares/
│ └── authMiddleware.js
│
├── config/
│ └── db.js
│
├── server.js
└── .env

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/Postaway.git
cd Postaway
2️⃣ Install dependencies
npm install

3️⃣ Setup environment variables

Create a .env file in the root directory:

PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

4️⃣ Run the server
npm run dev


Server will start on:
👉 http://localhost:8080

📡 API Endpoints

👤 User Routes

Method	          Endpoint	                    Description
POST	       /api/users/register	         Register a new user
POST	         /api/users/login	             Login user
PUT	       /api/users/update-details/:id	 Update user details

📝 Post Routes

Method	         Endpoint	           Description
GET	           /api/posts/	          Get all posts
POST	       /api/posts/	          Create new post
PUT	          /api/posts/:id	       Update post
DELETE	      /api/posts/:id	       Delete post

💬 Comment Routes

Method	           Endpoint	                    Description
GET	         /api/comments/:postId	      Get all comments for a post
POST	     /api/comments/:postId	            Add comment
PUT	         /api/comments/:commentId	       Update comment
DELETE	     /api/comments/:commentId	       Delete comment

❤️ Like Routes

Method	            Endpoint	              Description
GET	           /api/likes/:postId	      Get likes for a post
POST	    /api/likes/toggle/:postId	   Toggle like/unlike

🤝 Friendship Routes

Method	             Endpoint	                                Description
GET	          /api/friends/get-friends/:userId	               Get all friends
GET	          /api/friends/get-pending-requests	           Get pending friend requests
POST	    /api/friends/toggle-friendship/:friendId	     Send or cancel request
POST	    /api/friends/response-to-request/:friendId	    Accept or reject request

🔒 Authentication

All protected routes require a valid JWT token.
Include it in headers as:

Authorization: Bearer <your-token>

🧪 Testing

Use Postman to test endpoints:

Set baseURL = http://localhost:8080

Use environment variable for JWT token

Test CRUD and authorization flows

🚀 Future Enhancements

OTP-based password reset using Nodemailer

Real-time notifications (Socket.io)

Cloudinary image uploads

Pagination and filtering for posts

🧑‍💻 Author

Payal Talwekar
Full Stack Developer | Node.js & React Enthusiast
LinkedIn - www.linkedin.com/in/payal-talwekar-7a0543228
GitHub - https://github.com/Payal0810

⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!

---

```
