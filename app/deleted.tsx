import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { LinearTransition, SlideInRight } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

import { Header } from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';
import { NoContent } from '@/components/NoContent';
import { useArticles } from '@/features/articles/hooks/useArticles';
import { ArticleItem } from '@/features/articles/components/ArticleItem';
import { useArticleContext } from '@/features/articles/context/ArticleContext';

export default function DeletedArticlesScreen() {
  const { isFavorited, isDeleted, restoreArticle } = useArticleContext();
  const { data: articles } = useArticles();

  const router = useRouter();

  const deletedArticles = articles?.filter((article) =>
    isDeleted(article.objectID)
  );

  return (
    <View style={styles.container}>
      <Header.Root>
        <Header.Title title="Deleted Articles" />

        <Header.Action>
          <TouchableOpacity
            onPress={() => router.back()}>
            <Ionicons name="home" size={28} color="white" />
          </TouchableOpacity>
        </Header.Action >
      </Header.Root>

      {deletedArticles?.length ? (
        <FlatList
          data={deletedArticles}
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
        <NoContent text='No deleted articles.' />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1B1F',
  },
  list: {
    padding: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 48,
    color: 'gray',
  },
  backText: {
    color: 'white',
    fontSize: 16,
    padding: 8,
  },
});