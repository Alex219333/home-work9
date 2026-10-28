import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { TokenService } from "../../services/types/token.js";

export const createRequireAuth = (tokenService: TokenService): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken;

    if (typeof token !== "string") {
      res.status(401).json({ message: "Access token is missing" });
      return;
    }

    const userId = tokenService.verifyAccessToken(token);

    if (userId === null) {
      res.status(401).json({ message: "Invalid access token" });
      return;
    }

    res.locals.userId = userId;
    next();
  };
};
