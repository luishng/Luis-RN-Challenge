import { View, Text, Switch, ActivityIndicator, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { THEME } from '@/styles/theme';
import { useRouter } from 'expo-router';
import { Header } from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';
import { useNotificationPreferences } from '@/features/settings/hooks/useNotificationPreferences';

const ScrollViewAnimated = Animated.createAnimatedComponent(ScrollView)

export default function SettingsScreen() {
  const { preferences, togglePreference, loading } = useNotificationPreferences();
  const router = useRouter();

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
      <Header.Root>
        <Header.Title title="Settings" />

        <Header.Action>
          <TouchableOpacity
            onPress={() => router.back()}>
            <Ionicons name="home" size={28} color="white" />
          </TouchableOpacity>
        </Header.Action >
      </Header.Root>

      <ScrollViewAnimated contentContainerStyle={{ padding: 20 }} entering={FadeInUp}>
        <Text style={styles.title}>
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
            <Text style={styles.text}>{capitalize(key)}</Text>
            <Switch
              value={value}
              onValueChange={() => togglePreference(key as keyof typeof preferences)}
            />
          </View>
        ))}
      </ScrollViewAnimated>
    </View>
  );
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.GREY_800,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    color: THEME.COLORS.WHITE,
    fontWeight: 'bold',
    fontFamily: THEME.FONTS.BOLD,
  },
  text: {
    fontSize: 16,
    color: THEME.COLORS.WHITE,
    fontFamily: THEME.FONTS.REGULAR,
  },
});