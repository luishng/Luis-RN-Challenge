import { FlatList, Text, View, ActivityIndicator, RefreshControl } from 'react-native';
import { useArticles } from '../features/articles/hooks/useArticles';
import { useArticleContext } from '../features/articles/storage/ArticleContext';
import { ArticleItem } from '../features/articles/components/ArticleItem';
import { useState } from 'react';

export default function FavoritesScreen() {
  const { data, isLoading, isError, refetch, isRefetching } = useArticles();
  const { isFavorited, isDeleted, toggleFavorite, deleteArticle } = useArticleContext();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) return <ActivityIndicator />;
  if (isError) return <Text>Failed to load articles.</Text>;

  const filteredData = data?.filter(
    (item) => isFavorited(item.objectID) && !isDeleted(item.objectID)
  );

  if (!filteredData || filteredData.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No favorited articles yet.</Text>
      </View>
    );
  }

  return (
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
  );
}
