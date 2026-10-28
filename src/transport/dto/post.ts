export type CreatePostDto = {
  title: string;
  content: string;
  category: string;
};

export type UpdatePostDto = CreatePostDto & {
  authorId: number;
};
