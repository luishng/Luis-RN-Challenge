import { Slot } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { queryClient } from "@/lib/queryClient";
import { ArticleProvider } from "@/features/articles/storage/ArticleContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Loading } from "@/components/Loading";
import { THEME } from "@/styles/theme";

export default function Layout() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  if (!fontsLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ArticleProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={THEME.COLORS.GREY_600}
            translucent
          />
          <SafeAreaView style={{ flex: 1, backgroundColor: THEME.COLORS.GREY_600 }}>
            <Slot />
          </SafeAreaView>
        </GestureHandlerRootView>
      </ArticleProvider>
    </QueryClientProvider>
  );
}