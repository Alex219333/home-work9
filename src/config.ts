export const config = {
  isProduction: process.env.NODE_ENV === "production",
  accessSecret: process.env.JWT_ACCESS_SECRET || "access-secret",
  refreshSecret: process.env.JWT_REFRESH_SECRET || "refresh-secret",
  accessTtl: 15 * 60,
  refreshTtl: 7 * 24 * 60 * 60,
};
