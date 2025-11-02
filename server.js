// import statement
import express from "express";
import authRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { postRouter } from "./routes/postRoutes.js";
import { commentRouter } from "./routes/commentRoutes.js";
import { likeRouter } from "./routes/likeRoutes.js";
import { friendshipRouter } from "./routes/friendshipRoutes.js";

// dotenv configuration
dotenv.config();

// database connection
connectDB();

// rest object
const app = express();

// parse data
app.use(express.json());

// auth routes
app.use("/api/users", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likeRouter);
app.use("/api/friends", friendshipRouter);

// default route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Postaway!!!</h1>");
});

// port
const port = process.env.PORT || 3000;

// listener
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
