import { renderHook, waitFor } from '@testing-library/react-native';
import { useFavoriteArticles } from '../useFavoriteArticles';

import * as ArticleContext from '../../context/ArticleContext';
import * as Storage from '../../storage/articleStorage';
import { Article } from '../../model/article';

describe('useFavoriteArticles', () => {
  const mockArticle: Article = {
    objectID: '1',
    title: 'Title',
    story_title: '',
    url: 'https://test.com',
    created_at: new Date().toISOString(),
    author: 'author',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(Storage, 'getCachedArticles').mockResolvedValue([mockArticle]);

    jest.spyOn(ArticleContext, 'useArticleContext').mockReturnValue({
      favorites: ['1'],
      deleted: [],
      isFavorited: () => true,
      isDeleted: () => false,
      toggleFavorite: jest.fn(),
      deleteArticle: jest.fn(),
      restoreArticle: jest.fn(),
    });
  });

  it('returns only favorited and not deleted articles', async () => {
    const { result } = renderHook(() => useFavoriteArticles());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.articles).toHaveLength(1);
    expect(result.current.articles[0].objectID).toBe('1');
  });

  it('returns empty array when no favorites', async () => {
    jest.spyOn(ArticleContext, 'useArticleContext').mockReturnValue({
      favorites: [],
      deleted: [],
      isFavorited: () => false,
      isDeleted: () => false,
      toggleFavorite: jest.fn(),
      deleteArticle: jest.fn(),
      restoreArticle: jest.fn(),
    });

    const { result } = renderHook(() => useFavoriteArticles());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.articles).toHaveLength(0);
  });
});