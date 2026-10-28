import type { Request, Response } from "express";
import type { Service } from "../../services/types/post.js";
import type { CreatePostDto, UpdatePostDto } from "../dto/post.js";

export type PostHandlers = {
  getPosts: (req: Request, res: Response) => void;
  getPostById: (req: Request, res: Response) => void;
  createPost: (req: Request, res: Response) => void;
  updatePost: (req: Request, res: Response) => void;
  deletePost: (req: Request, res: Response) => void;
};

// Проверяет данные поста. Возвращает текст ошибки или null, если всё хорошо.
// Используется и при создании, и при изменении поста.
const validatePostData = (body: Partial<CreatePostDto> | undefined): string | null => {
  const { title, content, category } = body ?? {};

  if (typeof title !== "string" || typeof content !== "string" || typeof category !== "string") {
    return "title, content and category must be strings";
  }

  if (title.trim() === "" || content.trim() === "") {
    return "title and content are required";
  }

  return null;
};

export const createPostHandlers = (service: Service): PostHandlers => {
  const getPosts = (req: Request, res: Response) => {
    const category = req.query.category as string | undefined;
    let take: number | undefined = undefined;

    if (req.query.take !== undefined) {
      take = Number(req.query.take);

      if (!Number.isInteger(take) || take <= 0) {
        res.status(422).json({ message: "take must be a positive number" });
        return;
      }
    }

    const posts = service.getPosts(category, take);
    res.status(200).json(posts);
  };

  const getPostById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(422).json({ message: "id must be a positive number" });
      return;
    }

    const post = service.getPostById(id);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.status(200).json(post);
  };

  const createPost = (req: Request, res: Response) => {
    const error = validatePostData(req.body);

    if (error) {
      res.status(422).json({ message: error });
      return;
    }

    const authorId = res.locals.userId as number;
    const { title, content, category } = req.body as CreatePostDto;
    const newPost = service.createPost({ title, content, category, authorId });
    res.status(201).json(newPost);
  };

  const updatePost = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(422).json({ message: "id must be a positive number" });
      return;
    }

    const error = validatePostData(req.body);

    if (error) {
      res.status(422).json({ message: error });
      return;
    }

    const { title, content, category, authorId } = req.body as UpdatePostDto;

    if (!Number.isInteger(authorId) || authorId <= 0) {
      res.status(422).json({ message: "authorId must be a positive number" });
      return;
    }

    const updatedPost = service.updatePost(id, { title, content, category, authorId });

    if (!updatedPost) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.status(200).json(updatedPost);
  };

  const deletePost = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(422).json({ message: "id must be a positive number" });
      return;
    }

    const deleted = service.deletePost(id);

    if (!deleted) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.status(204).send();
  };

  return { getPosts, getPostById, createPost, updatePost, deletePost };
};
