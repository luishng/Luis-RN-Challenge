import React from 'react';
import { View, Text, Switch, ActivityIndicator, ScrollView } from 'react-native';
import { useNotificationPreferences } from '@/features/settings/hooks/useNotificationPreferences';

export default function SettingsScreen() {
  const { preferences, togglePreference, loading } = useNotificationPreferences();

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
        Notification Preferences
      </Text>

      {Object.entries(preferences).map(([key, value]) => (
        <View
          key={key}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
          }}
        >
          <Text style={{ fontSize: 16 }}>{capitalize(key)}</Text>
          <Switch
            value={value}
            onValueChange={() => togglePreference(key as keyof typeof preferences)}
          />
        </View>
      ))}
    </ScrollView>
  );
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
