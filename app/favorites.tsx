import { FlatList, View, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { LinearTransition, SlideInRight } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { THEME } from '@/styles/theme';
import { Header } from '@/components/Header';
import { NoContent } from '@/components/NoContent';
import { ArticleItem } from '@/features/articles/components/ArticleItem';
import { useArticleContext } from '@/features/articles/context/ArticleContext';
import { useFavoriteArticles } from '@/features/articles/hooks/useFavoriteArticles';

export default function FavoritesScreen() {
  const { articles, loading } = useFavoriteArticles();
  const { isFavorited, toggleFavorite } = useArticleContext();

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header.Root>
        <Header.Title title="Favorites" />

        <Header.Action>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="home" size={28} color="white" />
          </TouchableOpacity>
        </Header.Action>
      </Header.Root>

      {loading || articles.length === 0 ? (
        <NoContent text="No favorited articles yet." />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.objectID}
          contentContainerStyle={styles.articleCards}
          renderItem={({ item }) => (
            <Animated.View
              key={item.objectID}
              entering={SlideInRight}
              layout={LinearTransition.springify()}
            >
              <ArticleItem
                article={item}
                isFavorited={isFavorited(item.objectID)}
                onToggleFavorite={() => toggleFavorite(item.objectID)}
              />
            </Animated.View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.GREY_800,
  },
  articleCards: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
});
