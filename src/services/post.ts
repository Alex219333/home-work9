import type { Post } from "../domain/post/entity.js";
import type { Repository } from "../domain/post/repository.js";
import type { Service } from "./types/post.js";

export const createPostService = (repository: Repository): Service => {
  const getPosts = (category?: string, take?: number): Post[] => {
    return repository.getAll(category, take);
  };

  const getPostById = (id: number): Post | undefined => {
    return repository.getById(id);
  };

  const createPost = (data: Omit<Post, "id">): Post => {
    return repository.addPost(data);
  };

  const updatePost = (id: number, data: Omit<Post, "id">): Post | undefined => {
    return repository.updatePost(id, data);
  };

  const deletePost = (id: number): boolean => {
    return repository.deletePost(id);
  };

  return { getPosts, getPostById, createPost, updatePost, deletePost };
};
