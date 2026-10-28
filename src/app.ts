import express from "express";
import cookieParser from "cookie-parser";
import { createPostRepository } from "./repositories/post.js";
import { createUserRepository } from "./repositories/user.js";
import { createPostService } from "./services/post.js";
import { createTokenService } from "./services/token.js";
import { createAuthService } from "./services/auth.js";
import { createPostHandlers } from "./transport/handlers/post.js";
import { createAuthHandlers } from "./transport/handlers/auth.js";
import { createRequireAuth } from "./transport/middleware/requireAuth.js";
import { createPostRouter } from "./routers/post.js";
import { createAuthRouter } from "./routers/auth.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

// composition root: тут збираємо всі залежності
const tokenService = createTokenService();
const requireAuth = createRequireAuth(tokenService);

const userRepository = createUserRepository();
const authService = createAuthService(userRepository, tokenService);
const authHandlers = createAuthHandlers(authService);
const authRouter = createAuthRouter(authHandlers, requireAuth);

const postRepository = createPostRepository();
const postService = createPostService(postRepository);
const postHandlers = createPostHandlers(postService);
const postRouter = createPostRouter(postHandlers, requireAuth);

app.use("/auth", authRouter);
app.use("/posts", postRouter);

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
