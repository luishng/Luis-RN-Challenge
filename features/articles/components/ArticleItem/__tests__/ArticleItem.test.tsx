import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ArticleItem } from '..';

const mockArticle = {
  objectID: '1',
  title: 'Test Title',
  story_title: 'Test Story Title',
  created_at: new Date().toISOString(),
  author: 'Author',
  url: 'https://example.com',
};

describe('ArticleItem', () => {
  it('should render title and author', () => {
    const { getByText, getByTestId } = render(
      <ArticleItem
        article={mockArticle}
        isFavorited={false}
      />
    );

    expect(getByText('Test Title')).toBeTruthy();
  });

  it('should calls onToggleFavorite when star is pressed', () => {
    const toggleMock = jest.fn();

    const { getByTestId } = render(
      <ArticleItem
        article={mockArticle}
        isFavorited={false}
        onToggleFavorite={toggleMock}
      />
    );

    const button = getByTestId('favorite-button');
    fireEvent.press(button);
    expect(toggleMock).toHaveBeenCalled();
  });

  it('should calls onRestore when restore button is pressed', () => {
    const toggleMock = jest.fn();

    const { getByTestId } = render(
      <ArticleItem
        article={mockArticle}
        isFavorited={false}
        onRestore={toggleMock}
      />
    );

    const button = getByTestId('restore-button');
    fireEvent.press(button);
    expect(toggleMock).toHaveBeenCalled();
  });
});
