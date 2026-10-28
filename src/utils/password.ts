import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

export const hashPassword = (password: string): string => {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return salt + ":" + hash;
};

export const verifyPassword = (password: string, saved: string): boolean => {
  const [salt, hash] = saved.split(":");
  if (!salt || !hash) {
    return false;
  }

  const newHash = scryptSync(password, salt, 64);
  return timingSafeEqual(Buffer.from(hash, "hex"), newHash);
};
