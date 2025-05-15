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
        const cached = await getCachedArticles();

        const newArticles = fresh.filter(
          (a) => !cached?.some((b) => b.objectID === a.objectID)
        );

        if (newArticles.length > 0) {
          const updated = [...newArticles, ...(cached ?? [])];
          await cacheArticles(updated);
          return updated;
        }

        return cached ?? [];
      } catch (err) {
        const cached = await getCachedArticles();
        if (cached) {
          return cached;
        }
        throw new Error('No connection and no cached data available.');
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
