import { View, Text, Pressable } from 'react-native';
import { Article } from '../model/article';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

interface Props {
  article: Article;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  onDelete: () => void;
}

export function ArticleItem({
  article,
  isFavorited,
  onToggleFavorite,
  onDelete,
}: Props) {
  const title = article.story_title || article.title || 'No title';
  const timeAgo = formatDistanceToNow(new Date(article.created_at), {
    addSuffix: true,
    locale: enUS,
  });

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Link href={`/article/${article.objectID}`} asChild>
        <Pressable style={{ flex: 1, padding: 16, borderBottomWidth: 1, backgroundColor: 'white' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
          <Text style={{ fontSize: 12, color: 'gray' }}>
            {article.author} – {timeAgo}
          </Text>
        </Pressable>
      </Link>
      <Pressable onPress={onToggleFavorite} style={{ padding: 8 }}>
        <Ionicons
          name={isFavorited ? 'star' : 'star-outline'}
          size={20}
          color="gold"
        />
      </Pressable>
      <Pressable onPress={onDelete} style={{ padding: 8 }}>
        <Ionicons name="trash-outline" size={20} color="red" />
      </Pressable>
    </View>
  );
}
