import React from 'react';
import { render } from '@testing-library/react-native';
import { NoContent } from '../NoContent';

describe('NoContent', () => {
  it('displays the provided text', () => {
    const { getByText } = render(<NoContent text="Nothing here yet" />);
    expect(getByText('Nothing here yet')).toBeTruthy();
  });
});