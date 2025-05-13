import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useArticles } from '../../features/articles/hooks/useArticles';
import { WebView } from 'react-native-webview';
import { NoContent } from '@/components/NoContent';
import { Header } from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useArticles();

  const router = useRouter();

  if (isLoading) return <ActivityIndicator />;

  const article = data?.find((item) => item.objectID === id);

  if (!article) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Article not found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header.Root>
        <Header.Title title={article.url ? article.title : 'No Article'} />

        <Header.Action>
          <TouchableOpacity
            onPress={() => router.back()}>
            <Ionicons name="home" size={28} color="white" />
          </TouchableOpacity>
        </Header.Action >
      </Header.Root>

      {!article.url ? (
        <NoContent text='This article does not have a valid URL.' />
      ) : (
        <WebView source={{ uri: article.url }} startInLoadingState />

      )}
    </View>
  );
}