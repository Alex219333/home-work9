import type { User } from "../domain/user/entity.js";
import type { UserRepository } from "../domain/user/repository.js";
import { hashPassword } from "../utils/password.js";

export const createUserRepository = (): UserRepository => {
  // пароль у всіх: password123
  const users: User[] = [
    { id: 1, email: "alex@example.com", passwordHash: hashPassword("password123") },
    { id: 2, email: "maria@example.com", passwordHash: hashPassword("password123") },
    { id: 3, email: "john@example.com", passwordHash: hashPassword("password123") },
  ];

  const getById = (id: number): User | undefined => {
    return users.find((user) => user.id === id);
  };

  const getByEmail = (email: string): User | undefined => {
    return users.find((user) => user.email === email);
  };

  return { getById, getByEmail };
};
