import type { Post } from "../../domain/post/entity.js";

export interface Service {
  getPosts(category?: string, take?: number): Post[];
  getPostById(id: number): Post | undefined;
  createPost(data: Omit<Post, "id">): Post;
  updatePost(id: number, data: Omit<Post, "id">): Post | undefined;
  deletePost(id: number): boolean;
}
