import { useEffect, useState } from 'react';
import { Article } from '../model/article';
import { getCachedArticles } from '../storage/articleStorage';
import { useArticleContext } from '../context/ArticleContext';

export function useDeletedArticles() {
  const { deleted } = useArticleContext();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const cached = await getCachedArticles();
      if (cached) {
        const filtered = cached.filter((article) =>
          deleted.includes(article.objectID)
        );
        setArticles(filtered);
      }
      setLoading(false);
    };
    load();
  }, [deleted]);

  return { articles, loading };
}
