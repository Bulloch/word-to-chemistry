import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Main from '../Main';

describe('Main Component', () => {
  test('renders input section', () => {
    render(<Main />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('handles empty input', () => {
    render(<Main />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '' } });
    expect(screen.getByText('Empty starting string')).toBeInTheDocument();
  });

  test('processes text input', () => {
    render(<Main />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'he' } });
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('toggles combinations view', () => {
    render(<Main />);
    const toggleButton = screen.getByText('Show All');
    fireEvent.click(toggleButton);
    expect(toggleButton.textContent).toBe('Show Best');
  });
});
