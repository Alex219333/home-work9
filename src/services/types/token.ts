export interface TokenService {
  createAccessToken(userId: number): string;
  createRefreshToken(userId: number): string;
  verifyAccessToken(token: string): number | null;
  verifyRefreshToken(token: string): number | null;
}
