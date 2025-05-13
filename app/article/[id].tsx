import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useArticles } from '../../features/articles/hooks/useArticles';
import { WebView } from 'react-native-webview';
import { NoContent } from '@/components/NoContent';
import { Header } from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';
import { Loading } from '@/components/Loading';

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useArticles();

  const router = useRouter();

  if (isLoading) {
    return (
      <Loading />
    )
  }

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
        {!article.url && <Header.Title title='No Article' />}

        <Header.BackAction>
          <TouchableOpacity
            onPress={() => router.back()}>
            <Ionicons name={article.url ? "chevron-back" : 'home'} size={28} color="white" />
          </TouchableOpacity>
        </Header.BackAction >

        {article.url && <Header.Title title='Back' />}
      </Header.Root>

      {!article.url ? (
        <NoContent text='This article does not have a valid URL.' />
      ) : (
        <WebView style={{ flex: 1 }} source={{ uri: article.url }} startInLoadingState />
      )}
    </View>
  );
}