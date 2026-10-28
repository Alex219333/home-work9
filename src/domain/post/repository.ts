import type { Post } from "./entity.js";

export interface Repository {
  getAll(category?: string, take?: number): Post[];
  getById(id: number): Post | undefined;
  addPost(data: Omit<Post, "id">): Post;
  updatePost(id: number, data: Omit<Post, "id">): Post | undefined;
  deletePost(id: number): boolean;
}
