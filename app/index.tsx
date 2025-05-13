import { FlatList, Text, ActivityIndicator, RefreshControl } from 'react-native';
import { useArticles } from '../features/articles/hooks/useArticles';
import { useState } from 'react';

import { ArticleItem } from '@/features/articles/components/ArticleItem';
import { useArticleContext } from '@/features/articles/storage/ArticleContext';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ArticleListScreen() {
  const { data, isLoading, refetch, isRefetching, isError } = useArticles();
  const { isFavorited, isDeleted, toggleFavorite, deleteArticle } = useArticleContext();

  const [refreshing, setRefreshing] = useState(false);
  const filteredData = data?.filter((item) => !isDeleted(item.objectID));

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) return <ActivityIndicator />;
  if (isError) return <Text>Failed to load articles.</Text>;

  return (
    <SafeAreaView>
      <Link href="/favorites">
        <Text style={{ padding: 16 }}>View Favorites</Text>
      </Link>
      <Link href="/settings">
        <Text style={{ padding: 16 }}>View Settings</Text>
      </Link>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.objectID}
        renderItem={({ item }) => (
          <ArticleItem
            article={item}
            isFavorited={isFavorited(item.objectID)}
            onToggleFavorite={() => toggleFavorite(item.objectID)}
            onDelete={() => deleteArticle(item.objectID)}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing || isRefetching} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
