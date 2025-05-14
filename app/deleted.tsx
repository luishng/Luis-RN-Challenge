import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { LinearTransition, SlideInRight } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Header } from '@/components/Header';
import { NoContent } from '@/components/NoContent';
import { ArticleItem } from '@/features/articles/components/ArticleItem';
import { useArticleContext } from '@/features/articles/context/ArticleContext';
import { useDeletedArticles } from '@/features/articles/hooks/useDeletedArticles';
import { THEME } from '@/styles/theme';

export default function DeletedArticlesScreen() {
  const { isFavorited, restoreArticle } = useArticleContext();
  const { articles, loading } = useDeletedArticles();

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header.Root>
        <Header.Title title="Deleted Articles" />

        <Header.Action>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="home" size={28} color="white" />
          </TouchableOpacity>
        </Header.Action>
      </Header.Root>

      {!loading && articles.length > 0 ? (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.objectID}
          renderItem={({ item }) => (
            <Animated.View
              key={item.objectID}
              entering={SlideInRight}
              layout={LinearTransition.springify()}
            >
              <ArticleItem
                article={item}
                isFavorited={isFavorited(item.objectID)}
                onRestore={() => restoreArticle(item.objectID)}
              />
            </Animated.View>
          )}
          contentContainerStyle={styles.list}
        />
      ) : (
        <NoContent text="No deleted articles." />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.GREY_800,
  },
  list: {
    padding: 16,
  },
});
