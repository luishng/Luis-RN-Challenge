import React from 'react';
import { render } from '@testing-library/react-native';
import { Loading } from '../Loading';

describe('Loading', () => {
  it('renders an ActivityIndicator', () => {
    const { getByTestId } = render(<Loading />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });
});
