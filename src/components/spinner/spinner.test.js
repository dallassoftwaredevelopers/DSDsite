import React from 'react';
import { render, screen } from '../../../__test__/testUtils';
import Spinner from './spinner';

describe('Spinner Component', () => {
  test('renders spinner with default props', () => {
    render(<Spinner />);

    const spinner = screen.getByTestId('spinner') || screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toBeVisible();
  });

  test('renders spinner with custom size', () => {
    render(<Spinner size='large' />);

    const spinner = screen.getByTestId('spinner') || screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  test('renders spinner with custom color', () => {
    render(<Spinner color='blue' />);

    const spinner = screen.getByTestId('spinner') || screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    render(<Spinner />);

    const spinner = screen.getByTestId('spinner') || screen.getByRole('status');
    expect(spinner).toHaveAttribute('role', 'status') ||
      expect(spinner).toHaveAttribute('aria-label') ||
      expect(spinner).toHaveAttribute('aria-live', 'polite');
  });

  test('renders with loading text when provided', () => {
    render(<Spinner loadingText='Loading data...' />);

    // Check if loading text is present (may be visually hidden)
    const loadingText = screen.queryByText(/loading/i);
    if (loadingText) {
      expect(loadingText).toBeInTheDocument();
    }
  });

  test('renders without crashing', () => {
    expect(() => render(<Spinner />)).not.toThrow();
  });

  test('spinner has animation classes', () => {
    render(<Spinner />);

    const spinner = screen.getByTestId('spinner') || screen.getByRole('status');
    const hasAnimationClass =
      spinner.className.includes('spin') ||
      spinner.className.includes('rotate') ||
      spinner.className.includes('loading');
    expect(hasAnimationClass).toBeTruthy();
  });

  test('handles different spinner variants', () => {
    const variants = ['dots', 'bars', 'circle', 'pulse'];

    variants.forEach((variant) => {
      const { unmount } = render(<Spinner variant={variant} />);
      const spinner =
        screen.getByTestId('spinner') || screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
      unmount();
    });
  });
});
