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
        const fresh = await fetchArticles(query);
        const previous = await getCachedArticles();

        const map = new Map<string, Article>();
        (previous ?? []).forEach((a) => map.set(a.objectID, a));
        fresh.forEach((a) => map.set(a.objectID, a));

        const merged = Array.from(map.values());
        await cacheArticles(merged);

        return merged;
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
