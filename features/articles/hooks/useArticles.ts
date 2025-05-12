import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchArticles } from '../api/fetchArticles';
import { Article } from '../model/article';

const CACHE_KEY = 'articles_cache';

export function useArticles() {
  return useQuery<Article[]>({
    queryKey: ['articles'],
    queryFn: async () => {
      try {
        const data = await fetchArticles();
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
        return data;
      } catch (err) {
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) {
          return JSON.parse(cached) as Article[];
        }
        throw new Error('Erro ao buscar artigos e nenhum cache disponível');
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 1,
  });
}
