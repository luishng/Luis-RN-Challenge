import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';

import { fetchArticles } from '@/features/articles/api/fetchArticles';
import { getCachedArticles, cacheArticles } from '@/features/articles/storage/articleStorage';
import { getNotificationPreferences } from '@/features/notificationsPreference/storage/notificationPreferencesStorage';

const TASK_NAME = 'check-new-articles-task';

TaskManager.defineTask(TASK_NAME, async (): Promise<'newData' | 'noData' | 'failed'> => {
  try {
    console.log('[BG Task] Executando verificação de artigos novos...');

    const prefs = await getNotificationPreferences();
    if (!prefs || (!prefs.android && !prefs.ios)) {
      console.log('[BG Task] Preferências desativadas.');
      return 'noData';
    }

    const query =
      prefs.android && prefs.ios
        ? 'mobile'
        : prefs.android
          ? 'android'
          : prefs.ios
            ? 'ios'
            : 'mobile';

    const fresh = await fetchArticles(query);
    const cached = await getCachedArticles();

    const cachedIDs = new Set((cached ?? []).map((a) => a.objectID));
    const newArticles = fresh.filter((a) => !cachedIDs.has(a.objectID));

    if (newArticles.length > 0) {
      const first = newArticles[0];
      console.log(`[BG Task] ${newArticles.length} novos artigos encontrados.`);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: first.title || first.story_title || 'New article!',
          body: `Author: ${first.author}`,
          data: { objectID: first.objectID },
        },
        trigger: null,
      });

      const all = [...newArticles, ...(cached ?? [])];
      const unique = Array.from(new Map(all.map((a) => [a.objectID, a])).values());
      await cacheArticles(unique);

      return 'newData';
    }

    return 'noData';
  } catch (error) {
    console.error('[BG Task] Erro ao executar tarefa:', error);
    return 'failed';
  }
});

// Função para registrar a tarefa
export async function registerBackgroundCheck() {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(TASK_NAME);
  if (!isRegistered) {
    await BackgroundFetch.registerTaskAsync(TASK_NAME, {
      // minimumInterval: 15 * 60, // 15 minutes
      minimumInterval: 60, // 15 minutos
      stopOnTerminate: false,
      startOnBoot: true,
    });
    console.log('[BG Task] Tarefa registrada com sucesso.');
  } else {
    console.log('[BG Task] Já registrada.');
  }
}
