import type { Request, Response } from "express";
import { config } from "../../config.js";
import type { AuthService, Tokens } from "../../services/types/auth.js";
import type { LoginDto } from "../dto/auth.js";

export type AuthHandlers = {
  login: (req: Request, res: Response) => void;
  refresh: (req: Request, res: Response) => void;
  me: (req: Request, res: Response) => void;
};

const setCookies = (res: Response, tokens: Tokens) => {
  res.cookie("accessToken", tokens.accessToken, {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: "strict",
    maxAge: config.accessTtl * 1000,
  });

  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: "strict",
    maxAge: config.refreshTtl * 1000,
  });
};

export const createAuthHandlers = (service: AuthService): AuthHandlers => {
  const login = (req: Request, res: Response) => {
    const { email, password } = (req.body ?? {}) as Partial<LoginDto>;

    if (typeof email !== "string" || typeof password !== "string") {
      res.status(422).json({ message: "email and password must be strings" });
      return;
    }

    const tokens = service.login(email.trim().toLowerCase(), password);

    if (!tokens) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    setCookies(res, tokens);
    res.status(200).json({ message: "Logged in" });
  };

  const refresh = (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;

    if (typeof refreshToken !== "string") {
      res.status(401).json({ message: "Refresh token is missing" });
      return;
    }

    const tokens = service.refresh(refreshToken);

    if (!tokens) {
      res.status(401).json({ message: "Invalid refresh token" });
      return;
    }

    setCookies(res, tokens);
    res.status(200).json({ message: "Tokens refreshed" });
  };

  const me = (req: Request, res: Response) => {
    const user = service.me(res.locals.userId);

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  };

  return { login, refresh, me };
};
