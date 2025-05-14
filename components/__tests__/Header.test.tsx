import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Header } from '../Header';

describe('Header components', () => {
  it('renders Header.Root with custom style and children', () => {
    const { getByTestId } = render(
      <Header.Root style={{ backgroundColor: 'red' }}>
        <Text testID="child">Child</Text>
      </Header.Root>
    );

    expect(getByTestId('child')).toBeTruthy();
  });

  it('renders Header.Title with the correct title', () => {
    const { getByText } = render(<Header.Title title="My Header" />);
    expect(getByText('My Header')).toBeTruthy();
  });

  it('renders Header.Action with children', () => {
    const { getByTestId } = render(
      <Header.Action>
        <Text testID="action-child">Action</Text>
      </Header.Action>
    );

    expect(getByTestId('action-child')).toBeTruthy();
  });

  it('renders Header.BackAction with children', () => {
    const { getByTestId } = render(
      <Header.BackAction>
        <Text testID="back-action-child">Back</Text>
      </Header.BackAction>
    );

    expect(getByTestId('back-action-child')).toBeTruthy();
  });
});
