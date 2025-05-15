import { FlatList, Text, RefreshControl, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { addNotificationResponseReceivedListener, Subscription } from 'expo-notifications';
import Animated, { FadeInUp, LinearTransition } from 'react-native-reanimated';
import { Swipeable } from 'react-native-gesture-handler';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';

import { THEME } from '@/styles/theme';
import { Header } from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';
import { Loading } from '@/components/Loading';
import { NoContent } from '@/components/NoContent';
import { useArticles } from '@/features/articles/hooks/useArticles';
import { ArticleItem } from '@/features/articles/components/ArticleItem';
import { requestNotificationPermission } from '@/services/notifications';
import { useArticleContext } from '@/features/articles/context/ArticleContext';
import { registerBackgroundCheck } from '@/libs/notifications/backgroundTask';

export default function ArticleListScreen() {
  const { data, isLoading, refetch, isRefetching, isError } = useArticles();
  const { isFavorited, isDeleted, toggleFavorite, deleteArticle } = useArticleContext();

  const router = useRouter();
  const swipableRefs = useRef<Swipeable[]>([])
  const pendingIdRef = useRef<string | null>(null);
  const listenerRef = useRef<Subscription | null>(null);

  const [refreshing, setRefreshing] = useState(false);
  const filteredData = data?.filter((item) => !isDeleted(item.objectID));

  useEffect(() => {
    requestNotificationPermission();
    registerBackgroundCheck();
  }, []);

  useEffect(() => {
    listenerRef.current = addNotificationResponseReceivedListener((response) => {
      const articleId = response.notification.request.content.data?.objectID;
      if (articleId) {
        pendingIdRef.current = articleId;
        onRefresh()
      }
    });

    return () => {
      listenerRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (
      pendingIdRef.current &&
      !isLoading &&
      !isRefetching &&
      filteredData?.some(article => article.objectID === pendingIdRef.current)
    ) {
      router.push(`/article/${pendingIdRef.current}`);
      pendingIdRef.current = null;
    }
  }, [isLoading, filteredData, isRefetching]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isError) {
    return (
      <NoContent text='Failed to load articles.' />
    );
  }

  function handleDelete(id: string, index: number) {
    swipableRefs.current?.[index].close()

    Alert.alert(
      'Delete Article',
      'Are you sure you want to delete this article?',
      [
        {
          text: 'Yes', onPress: () => deleteArticle(id)
        },
        { text: 'No', style: 'cancel' }
      ]
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
            onPress={() => router.push('/deleted')}>
            <Ionicons name="trash-outline" size={28} color="white" />
          </TouchableOpacity>
        </Header.Action >

        <Header.Action>
          <TouchableOpacity
            onPress={() => router.push('/settings')}>
            <Ionicons name="settings-outline" size={28} color="white" />
          </TouchableOpacity>
        </Header.Action >
      </Header.Root>

      {isLoading ? (
        <Loading />
      ) :
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.objectID}
          contentContainerStyle={styles.articleCards}
          refreshControl={
            <RefreshControl refreshing={refreshing || isRefetching} onRefresh={onRefresh} />
          }
          renderItem={({ item, index }) => (
            <Animated.View
              key={item.objectID}
              entering={FadeInUp.delay(index * 100)}
              layout={LinearTransition.springify()}
            >
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
                onSwipeableOpen={() => handleDelete(item.objectID, index)}
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
            </Animated.View>
          )}
        />}
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