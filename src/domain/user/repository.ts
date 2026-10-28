import type { User } from "./entity.js";

export interface UserRepository {
  getById(id: number): User | undefined;
  getByEmail(email: string): User | undefined;
}
