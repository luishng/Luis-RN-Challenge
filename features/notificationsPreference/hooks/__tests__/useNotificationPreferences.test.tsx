import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Text, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  useNotificationPreferences,
} from '../useNotificationPreferences';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn().mockResolvedValue(null),
  setItem: jest.fn(),
}));

function TestPreferencesComponent() {
  const { preferences, togglePreference, loading } = useNotificationPreferences();

  if (loading) return <Text>Loading...</Text>;

  return (
    <>
      <Text testID="android">{String(preferences.android)}</Text>
      <Text testID="ios">{String(preferences.ios)}</Text>

      <Pressable testID="toggle-android" onPress={() => togglePreference('android')}>
        <Text>Toggle Android</Text>
      </Pressable>

      <Pressable testID="toggle-ios" onPress={() => togglePreference('ios')}>
        <Text>Toggle iOS</Text>
      </Pressable>
    </>
  );
}

describe('useNotificationPreferences', () => {
  it('loads default preferences when AsyncStorage is empty', async () => {
    const { getByTestId } = render(<TestPreferencesComponent />);

    await waitFor(() => {
      expect(getByTestId('android').props.children).toBe('true');
      expect(getByTestId('ios').props.children).toBe('true');
    });
  });

  it('toggles android preference and saves to AsyncStorage', async () => {
    const { getByTestId } = render(<TestPreferencesComponent />);

    await waitFor(() => {
      expect(getByTestId('android').props.children).toBe('true');
    });

    fireEvent.press(getByTestId('toggle-android'));

    expect(getByTestId('android').props.children).toBe('false');

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'notification_preferences',
      JSON.stringify({
        android: false,
        ios: true,
      })
    );
  });
});
