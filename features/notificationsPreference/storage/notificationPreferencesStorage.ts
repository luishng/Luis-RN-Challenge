import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationPreferences } from '../model/NotificationPreferences';

const STORAGE_KEY = 'notification_preferences';

export async function getNotificationPreferences(): Promise<NotificationPreferences | null> {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : null;
}

export async function setNotificationPreferences(preferences: NotificationPreferences): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
}