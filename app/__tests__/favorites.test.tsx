import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import FavoritesScreen from '@/app/favorites';
import { Article } from '@/features/articles/model/article';

jest.mock('@/features/articles/hooks/useFavoriteArticles');
jest.mock('@/features/articles/context/ArticleContext');

import { useFavoriteArticles } from '@/features/articles/hooks/useFavoriteArticles';
import { useArticleContext } from '@/features/articles/context/ArticleContext';

describe('FavoritesScreen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.mocked(useArticleContext).mockReturnValue({
      favorites: [],
      deleted: [],
      isFavorited: () => false,
      isDeleted: () => false,
      toggleFavorite: jest.fn(),
      deleteArticle: jest.fn(),
      restoreArticle: jest.fn(),
    });
  });

  it('renders list of favorited articles', async () => {
    const mockArticle: Article = {
      objectID: '1',
      title: 'Test Article',
      story_title: '',
      url: 'https://example.com',
      created_at: new Date().toISOString(),
      author: 'Author',
    };

    jest.mocked(useFavoriteArticles).mockReturnValue({
      articles: [mockArticle],
      loading: false,
    });

    const { getByText } = render(<FavoritesScreen />);
    await waitFor(() => {
      expect(getByText('Test Article')).toBeTruthy();
    });
  });

  it('shows empty state when no favorites', async () => {
    jest.mocked(useFavoriteArticles).mockReturnValue({
      articles: [],
      loading: false,
    });

    const { getByText } = render(<FavoritesScreen />);
    await waitFor(() => {
      expect(getByText('No favorited articles yet.')).toBeTruthy();
    });
  });
});
