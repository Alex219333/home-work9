import jwt from "jsonwebtoken";
import { config } from "../config.js";
import type { TokenService } from "./types/token.js";

export const createTokenService = (): TokenService => {
  const createAccessToken = (userId: number): string => {
    return jwt.sign({ userId, type: "access" }, config.accessSecret, { expiresIn: config.accessTtl });
  };

  const createRefreshToken = (userId: number): string => {
    return jwt.sign({ userId, type: "refresh" }, config.refreshSecret, { expiresIn: config.refreshTtl });
  };

  const verifyAccessToken = (token: string): number | null => {
    try {
      const payload = jwt.verify(token, config.accessSecret);
      if (typeof payload === "string" || payload.type !== "access") {
        return null;
      }
      return payload.userId;
    } catch {
      return null;
    }
  };

  const verifyRefreshToken = (token: string): number | null => {
    try {
      const payload = jwt.verify(token, config.refreshSecret);
      if (typeof payload === "string" || payload.type !== "refresh") {
        return null;
      }
      return payload.userId;
    } catch {
      return null;
    }
  };

  return { createAccessToken, createRefreshToken, verifyAccessToken, verifyRefreshToken };
};
