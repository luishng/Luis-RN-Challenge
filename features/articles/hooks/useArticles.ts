import { useQuery } from '@tanstack/react-query';

import { Article } from '../model/article';
import { fetchArticles } from '../api/fetchArticles';

import { cacheArticles, getCachedArticles } from '../storage/articleStorage';

import { useNotificationPreferences } from '@/features/notificationsPreference/hooks/useNotificationPreferences';

export function useArticles() {
  const { preferences } = useNotificationPreferences();

  const query = preferences.android && preferences.ios
    ? 'mobile'
    : preferences.android
      ? 'android'
      : preferences.ios
        ? 'ios'
        : 'mobile';

  return useQuery<Article[]>({
    queryKey: ['articles', query],
    queryFn: async () => {
      try {
        const data = await fetchArticles(query);
        await cacheArticles(data);
        return data;
      } catch (err) {
        const cached = await getCachedArticles();
        if (cached) {
          return cached;
        }
        throw new Error('Error fetching articles and no cache available');
      }
    },
    staleTime: 1000 * 60 * 3, // 3 minutes
    retry: 1,
  });
}
