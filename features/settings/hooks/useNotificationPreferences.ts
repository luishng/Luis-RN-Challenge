import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NotificationPreferences } from '../model/NotificationPreferences';

const STORAGE_KEY = 'notification_preferences';

export const defaultPreferences: NotificationPreferences = {
  android: true,
  ios: true,
};

export function useNotificationPreferences() {
  const [preferences, setPreferences] = useState<NotificationPreferences>(defaultPreferences);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          const parsed = JSON.parse(json);
          setPreferences(parsed);
        }
      } catch (error) {
        console.error('Erro ao carregar preferências:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, []);

  const togglePreference = async (key: keyof NotificationPreferences) => {
    const updated = { ...preferences, [key]: !preferences[key] };
    setPreferences(updated);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
    }
  };

  return {
    preferences,
    togglePreference,
    loading,
  };
}
