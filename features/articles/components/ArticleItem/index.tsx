import { View, Text, Pressable } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

import { styles } from './styles';
import { Article } from '../../model/article';
import { THEME } from '@/styles/theme';

interface Props {
  article: Article;
  isFavorited: boolean;
  onToggleFavorite?: () => void;
  onRestore?: () => void;
}

export function ArticleItem({
  article,
  isFavorited,
  onToggleFavorite,
  onRestore,
}: Props) {
  const title = article.url ? article.title : article.story_title;

  const timeAgo = formatDistanceToNow(new Date(article.created_at), {
    addSuffix: true,
    locale: enUS,
  });

  return (
    <View style={styles.container}>
      <Link href={`/article/${article.objectID}`} asChild>
        <Pressable style={styles.content}>
          <Text style={article.url ? styles.titleWithURL : styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            {article.author} – {timeAgo}
          </Text>
        </Pressable>
      </Link>

      {onToggleFavorite && (
        <View style={styles.actions}>
          <Pressable
            onPress={onToggleFavorite}
            style={styles.icon}
            testID="favorite-button"
          >
            <Ionicons
              name={isFavorited ? 'star' : 'star-outline'}
              size={20}
              color="gold"
            />
          </Pressable>
        </View>
      )}

      {onRestore && (
        <View style={styles.actions}>
          <Pressable
            onPress={onRestore}
            style={styles.icon}
            testID="restore-button"
          >
            <Ionicons
              name='refresh'
              size={20}
              color={THEME.COLORS.BRAND_LIGHT}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}
