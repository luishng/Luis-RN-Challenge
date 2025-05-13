import { View, Text, Pressable } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

import { styles } from './styles';
import { Article } from '../../model/article';

interface Props {
  article: Article;
  isFavorited: boolean;
  onToggleFavorite: () => void;
}

export function ArticleItem({
  article,
  isFavorited,
  onToggleFavorite,
}: Props) {
  const title = article.story_title || article.title || 'No title';
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

      <View style={styles.actions}>
        <Pressable onPress={onToggleFavorite} style={styles.icon}>
          <Ionicons
            name={isFavorited ? 'star' : 'star-outline'}
            size={20}
            color="gold"
          />
        </Pressable>
      </View>
    </View>
  );
}
