import { FlatList, Text, View, ActivityIndicator, Pressable, RefreshControl } from 'react-native';
import { useArticles } from '../features/articles/hooks/useArticles';
import { Article } from '../features/articles/model/article';
import { Link } from 'expo-router';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

export default function ArticleListScreen() {
  const { data, isLoading, refetch, isRefetching, isError } = useArticles();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) return <ActivityIndicator />;
  if (isError) return <Text>Failed to load articles.</Text>;

  const renderItem = ({ item }: { item: Article }) => {
    const title = item.story_title || item.title || 'No title';
    const timeAgo = formatDistanceToNow(new Date(item.created_at), {
      addSuffix: true,
      locale: enUS,
    });

    return (
      <Link href={`/article/${item.objectID}`} asChild>
        <Pressable style={{ padding: 16, borderBottomWidth: 1, backgroundColor: 'white' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
          <Text style={{ fontSize: 12, color: 'gray' }}>
            {item.author} – {timeAgo}
          </Text>
        </Pressable>
      </Link>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.objectID}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={refreshing || isRefetching} onRefresh={onRefresh} />
      }
    />
  );
}
