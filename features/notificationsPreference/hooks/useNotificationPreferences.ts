import { useState, useEffect } from 'react';
import { NotificationPreferences } from '../model/NotificationPreferences';
import {
  getNotificationPreferences,
  setNotificationPreferences,
} from '../storage/notificationPreferencesStorage';

export const defaultPreferences: NotificationPreferences = {
  android: true,
  ios: true,
};

export function useNotificationPreferences() {
  const [preferences, setPreferences] = useState<NotificationPreferences>(defaultPreferences);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await getNotificationPreferences();
        if (stored) setPreferences(stored);
      } catch (e) {
        console.log('Failed to load preferences', e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const togglePreference = async (key: keyof NotificationPreferences) => {
    const updated = { ...preferences, [key]: !preferences[key] };
    setPreferences(updated);
    try {
      await setNotificationPreferences(updated);
    } catch (e) {
      console.log('Failed to save preferences', e);
    }
  };

  return {
    preferences,
    togglePreference,
    loading,
  };
}