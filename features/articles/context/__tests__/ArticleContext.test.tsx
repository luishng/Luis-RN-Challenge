import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Text, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ArticleProvider, useArticleContext } from '../ArticleContext';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn().mockImplementation((key) => {
    if (key === 'favorites') return Promise.resolve(null);
    if (key === 'deleted') return Promise.resolve(JSON.stringify(['id1']));
    return Promise.resolve(null);
  }),
}));

function TestComponent() {
  const {
    favorites,
    deleted,
    toggleFavorite,
    deleteArticle,
    restoreArticle,
  } = useArticleContext();

  return (
    <>
      <Text testID="favorites">{JSON.stringify(favorites)}</Text>
      <Text testID="deleted">{JSON.stringify(deleted)}</Text>

      <Pressable testID="toggle-btn" onPress={() => toggleFavorite('abc123')}>
        <Text>Toggle</Text>
      </Pressable>
      <Pressable testID="delete-btn" onPress={() => deleteArticle('to-delete')}>
        <Text>Delete</Text>
      </Pressable>
      <Pressable testID="restore-btn" onPress={() => restoreArticle('id1')}>
        <Text>Restore</Text>
      </Pressable>
    </>
  );
}

describe('ArticleContext', () => {
  it('adds and removes a favorite', async () => {
    const { getByTestId } = render(
      <ArticleProvider>
        <TestComponent />
      </ArticleProvider>
    );

    await waitFor(() =>
      expect(getByTestId('favorites').props.children).toBeDefined()
    );

    const favoritesText = getByTestId('favorites');
    const button = getByTestId('toggle-btn');

    fireEvent.press(button);
    expect(favoritesText.props.children).toContain('abc123');

    fireEvent.press(button);
    expect(favoritesText.props.children).not.toContain('abc123');
  });

  it('restores a deleted article', async () => {
    const { getByTestId } = render(
      <ArticleProvider>
        <TestComponent />
      </ArticleProvider>
    );

    const deletedText = getByTestId('deleted');
    const restoreButton = getByTestId('restore-btn');

    await waitFor(() => {
      expect(deletedText.props.children).toContain('id1');
    });

    fireEvent.press(restoreButton);

    await waitFor(() => {
      expect(deletedText.props.children).not.toContain('id1');
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'deleted',
      JSON.stringify([])
    );
  });

  it('deletes an article and saves to storage', async () => {
    const { getByTestId } = render(
      <ArticleProvider>
        <TestComponent />
      </ArticleProvider>
    );

    await waitFor(() => {
      expect(getByTestId('deleted').props.children).toBeDefined();
    });

    const deletedText = getByTestId('deleted');

    expect(deletedText.props.children).not.toContain('to-delete');

    fireEvent.press(getByTestId('delete-btn'));

    await waitFor(() => {
      expect(deletedText.props.children).toContain('to-delete');
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'deleted',
      JSON.stringify(['to-delete'])
    );
  });
});
