import { ArticlesResponseSchema, Article } from '../model/article';
import { api } from '@/api';

export async function fetchArticles(): Promise<Article[]> {
  const response = await api.get('/search_by_date?query=mobile');
  const parsed = ArticlesResponseSchema.safeParse(response.data);

  if (!parsed.success) {
    console.error('Invalid API response', parsed.error);
    throw new Error('Invalid API response');
  }

  return parsed.data.hits;
}