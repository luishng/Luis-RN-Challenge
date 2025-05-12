import { z } from 'zod';

export const ArticleSchema = z.object({
  objectID: z.string(),
  story_title: z.string().optional().default('Story title'),
  title: z.string().optional().default('No title'),
  url: z.string().optional().default(''),
  created_at: z.string(),
  author: z.string().optional().default('Unknown author'),
});

export const ArticlesResponseSchema = z.object({
  hits: z.array(ArticleSchema),
});

export type Article = z.infer<typeof ArticleSchema>;