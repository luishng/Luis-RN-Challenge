import { ArticlesResponseSchema, Article } from '../model/article';
import { api } from '@/api';

export async function fetchArticles(query: string = 'mobile'): Promise<Article[]> {
  const response = await api.get(`/search_by_date?query=${query}`);
  const parsed = ArticlesResponseSchema.safeParse(response.data);

  if (!parsed.success) {
    console.log('Invalid API response', parsed.error);
    throw new Error('Invalid API response');
  }

  return parsed.data.hits;
}