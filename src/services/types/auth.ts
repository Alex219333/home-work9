export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type UserInfo = {
  id: number;
  email: string;
};

export interface AuthService {
  login(email: string, password: string): Tokens | undefined;
  refresh(refreshToken: string): Tokens | undefined;
  me(userId: number): UserInfo | undefined;
}
