import type { Post } from "../domain/post/entity.js";
import type { Repository } from "../domain/post/repository.js";

export const createPostRepository = (): Repository => {
  const posts: Post[] = [
    {
      id: 1,
      title: "How to start with JavaScript",
      content: "Some useful tips for beginners.",
      authorId: 1,
      category: "programming",
    },
    {
      id: 2,
      title: "My first API",
      content: "I created my first API with Express.",
      authorId: 2,
      category: "programming",
    },
    {
      id: 3,
      title: "Best books to read",
      content: "A few books I recommend.",
      authorId: 3,
      category: "books",
    },
  ];

  // счётчик для новых id: он только растёт, поэтому id удалённых постов не повторяются
  let nextId = posts.length + 1;

  const getAll = (category?: string, take?: number): Post[] => {
    let result = [...posts];

    if (category) {
      result = result.filter((post) => post.category === category);
    }

    if (take) {
      result = result.slice(0, take);
    }

    return result;
  };

  const getById = (id: number): Post | undefined => {
    return posts.find((post) => post.id === id);
  };

  const addPost = (data: Omit<Post, "id">): Post => {
    const newPost: Post = {
      id: nextId,
      title: data.title,
      content: data.content,
      authorId: data.authorId,
      category: data.category,
    };

    nextId++;
    posts.push(newPost);
    return newPost;
  };

  const updatePost = (id: number, data: Omit<Post, "id">): Post | undefined => {
    const index = posts.findIndex((post) => post.id === id);

    if (index === -1) {
      return undefined;
    }

    const updatedPost: Post = {
      id: id,
      title: data.title,
      content: data.content,
      authorId: data.authorId,
      category: data.category,
    };

    posts[index] = updatedPost;
    return updatedPost;
  };

  const deletePost = (id: number): boolean => {
    const index = posts.findIndex((post) => post.id === id);

    if (index === -1) {
      return false;
    }

    posts.splice(index, 1);
    return true;
  };

  return { getAll, getById, addPost, updatePost, deletePost };
};
