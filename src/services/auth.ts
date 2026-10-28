import type { UserRepository } from "../domain/user/repository.js";
import { verifyPassword } from "../utils/password.js";
import type { AuthService, Tokens, UserInfo } from "./types/auth.js";
import type { TokenService } from "./types/token.js";

export const createAuthService = (
  userRepository: UserRepository,
  tokenService: TokenService,
): AuthService => {
  const login = (email: string, password: string): Tokens | undefined => {
    const user = userRepository.getByEmail(email);

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return undefined;
    }

    return {
      accessToken: tokenService.createAccessToken(user.id),
      refreshToken: tokenService.createRefreshToken(user.id),
    };
  };

  const refresh = (refreshToken: string): Tokens | undefined => {
    const userId = tokenService.verifyRefreshToken(refreshToken);
    if (userId === null) {
      return undefined;
    }

    const user = userRepository.getById(userId);
    if (!user) {
      return undefined;
    }

    return {
      accessToken: tokenService.createAccessToken(user.id),
      refreshToken: tokenService.createRefreshToken(user.id),
    };
  };

  const me = (userId: number): UserInfo | undefined => {
    const user = userRepository.getById(userId);
    if (!user) {
      return undefined;
    }

    return { id: user.id, email: user.email };
  };

  return { login, refresh, me };
};
