import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export async function requestNotificationPermission() {
  if (!Device.isDevice) return false;

  const settings = await Notifications.getPermissionsAsync();
  if (settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
    return true;
  }

  const { granted } = await Notifications.requestPermissionsAsync();
  return granted;
}
