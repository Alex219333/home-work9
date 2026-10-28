import { Router } from "express";
import type { RequestHandler } from "express";
import type { PostHandlers } from "../transport/handlers/post.js";

export const createPostRouter = (handlers: PostHandlers, requireAuth: RequestHandler): Router => {
  const router = Router();

  router.get("/", handlers.getPosts);
  router.get("/:id", handlers.getPostById);
  router.post("/", requireAuth, handlers.createPost);
  router.put("/:id", handlers.updatePost);
  router.delete("/:id", handlers.deletePost);

  return router;
};
