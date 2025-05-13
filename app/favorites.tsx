import { FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { THEME } from '@/styles/theme';
import { Header } from '@/components/Header';
import { useArticles } from '@/features/articles/hooks/useArticles';
import { ArticleItem } from '@/features/articles/components/ArticleItem';
import { useArticleContext } from '@/features/articles/storage/ArticleContext';
import { NoContent } from '@/components/NoContent';

export default function FavoritesScreen() {
  const { data } = useArticles();
  const { isFavorited, isDeleted, toggleFavorite } = useArticleContext();

  const router = useRouter();

  const filteredData = data?.filter(
    (item) => isFavorited(item.objectID) && !isDeleted(item.objectID)
  );

  return (
    <View style={styles.container}>
      <Header.Root>
        <Header.Title title="Hacker News" />

        <Header.Action>
          <TouchableOpacity
            onPress={() => router.back()}>
            <Ionicons name="home" size={28} color="white" />
          </TouchableOpacity>
        </Header.Action >
      </Header.Root>

      {!filteredData || filteredData.length === 0 ? (
        <NoContent text='No favorited articles yet.' />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.objectID}
          contentContainerStyle={styles.articleCards}
          renderItem={({ item }) => (
            <ArticleItem
              article={item}
              isFavorited={isFavorited(item.objectID)}
              onToggleFavorite={() => toggleFavorite(item.objectID)}
            />
          )}
        />
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.GREY_800,
  },
  containerError: {
    flex: 1,
    backgroundColor: THEME.COLORS.GREY_800,
    alignItems: 'center',
    justifyContent: 'center'
  },
  articleCards: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  textError: {
    color: THEME.COLORS.WHITE
  },
});