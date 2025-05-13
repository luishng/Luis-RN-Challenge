import { FlatList, Text, ActivityIndicator, RefreshControl, StyleSheet, SafeAreaView, Pressable, TouchableOpacity, View } from 'react-native';
import { useArticles } from '../features/articles/hooks/useArticles';
import { useRef, useState } from 'react';
import { useRouter } from 'expo-router';

import { Header } from '@/components/Header';
import { ArticleItem } from '@/features/articles/components/ArticleItem';
import { useArticleContext } from '@/features/articles/storage/ArticleContext';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '@/styles/theme';
import { Swipeable } from 'react-native-gesture-handler';
import { Loading } from '@/components/Loading';
import { NoContent } from '@/components/NoContent';

export default function ArticleListScreen() {
  const { data, isLoading, refetch, isRefetching, isError } = useArticles();
  const { isFavorited, isDeleted, toggleFavorite, deleteArticle } = useArticleContext();

  const router = useRouter();
  const swipableRefs = useRef<Swipeable[]>([])

  const [refreshing, setRefreshing] = useState(false);
  const filteredData = data?.filter((item) => !isDeleted(item.objectID));

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <Loading />
    )
  }

  if (isError) {
    return (
      <NoContent text='Failed to load articles.' />
    );
  }

  return (
    <View style={styles.container}>
      <Header.Root>
        <Header.Title title="Hacker News" />

        <Header.Action>
          <TouchableOpacity
            onPress={() => router.push('/favorites')}>
            <Ionicons name="bookmark-outline" size={28} color="white" />
          </TouchableOpacity>
        </Header.Action >

        <Header.Action>
          <TouchableOpacity
            onPress={() => router.push('/settings')}>
            <Ionicons name="settings-outline" size={28} color="white" />
          </TouchableOpacity>
        </Header.Action >
      </Header.Root>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.objectID}
        contentContainerStyle={styles.articleCards}
        refreshControl={
          <RefreshControl refreshing={refreshing || isRefetching} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <Swipeable
            ref={(ref) => {
              if (ref) {
                swipableRefs.current.push(ref)
              }
            }}
            containerStyle={styles.swipeableContainer}
            overshootRight={false}
            rightThreshold={10}
            shouldCancelWhenOutside={false}
            renderLeftActions={() => null}
            onSwipeableOpen={() => deleteArticle(item.objectID)}
            renderRightActions={() => (
              <View
                style={styles.swipeableRemove}
              >
                <Text style={styles.swipeableText}>Delete</Text>
              </View>
            )}
          >
            <ArticleItem
              article={item}
              isFavorited={isFavorited(item.objectID)}
              onToggleFavorite={() => toggleFavorite(item.objectID)}
            />
          </Swipeable>
        )}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.GREY_800,
  },
  articleCards: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  swipeableContainer: {
    width: '100%',
    height: 90,
    borderRadius: 6,
    marginBottom: 12,
  },
  swipeableRemove: {
    width: 90,
    height: 90,
    borderRadius: 6,
    backgroundColor: THEME.COLORS.DANGER_LIGHT,
    alignItems: 'center',
    marginHorizontal: 8,
    justifyContent: 'center',
  },
  swipeableText: {
    color: THEME.COLORS.WHITE,
    fontFamily: THEME.FONTS.REGULAR,
  },
});