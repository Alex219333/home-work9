import { Router } from "express";
import type { RequestHandler } from "express";
import type { AuthHandlers } from "../transport/handlers/auth.js";

export const createAuthRouter = (handlers: AuthHandlers, requireAuth: RequestHandler): Router => {
  const router = Router();

  router.post("/login", handlers.login);
  router.post("/refresh", handlers.refresh);
  router.get("/me", requireAuth, handlers.me);

  return router;
};
