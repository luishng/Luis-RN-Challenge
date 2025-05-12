import { useLocalSearchParams, Stack } from 'expo-router';
import { Text, View, ActivityIndicator } from 'react-native';
import { useArticles } from '../../features/articles/hooks/useArticles';
import { WebView } from 'react-native-webview';

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useArticles();

  if (isLoading) return <ActivityIndicator />;

  const article = data?.find((item) => item.objectID === id);

  if (!article) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Article not found.</Text>
      </View>
    );
  }

  if (!article.url) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>This article does not have a valid URL.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: article.title || 'Article' }} />
      <WebView source={{ uri: article.url }} startInLoadingState />
    </View>
  );
}