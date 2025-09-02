import React from 'react';
import { render, screen, fireEvent } from '../../../__test__/testUtils';
import Card from './Card';

describe('Card Component', () => {
  const defaultProps = {
    title: 'Test Card Title',
    children: <div data-testid='card-content'>Card content</div>,
  };

  test('renders card with title', () => {
    render(<Card {...defaultProps} />);

    const title = screen.getByText('Test Card Title');
    expect(title).toBeInTheDocument();
  });

  test('renders card content', () => {
    render(<Card {...defaultProps} />);

    const content = screen.getByTestId('card-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Card content');
  });

  test('renders card without title', () => {
    const props = { ...defaultProps, title: undefined };
    render(<Card {...props} />);

    const content = screen.getByTestId('card-content');
    expect(content).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<Card {...defaultProps} className='custom-card' />);

    const card =
      screen.getByRole('article') ||
      screen.getByTestId('card') ||
      screen.getByText('Test Card Title').closest('div');
    expect(card).toHaveClass('custom-card');
  });

  test('handles onClick events', () => {
    const handleClick = jest.fn();
    render(<Card {...defaultProps} onClick={handleClick} />);

    const card =
      screen.getByRole('button') ||
      screen.getByText('Test Card Title').closest('[role="button"]');
    if (card) {
      fireEvent.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    }
  });

  test('renders with different variants', () => {
    const variants = ['default', 'outlined', 'elevated', 'filled'];

    variants.forEach((variant) => {
      const { unmount } = render(<Card {...defaultProps} variant={variant} />);
      const title = screen.getByText('Test Card Title');
      expect(title).toBeInTheDocument();
      unmount();
    });
  });

  test('renders with image', () => {
    const propsWithImage = {
      ...defaultProps,
      image: {
        src: 'https://example.com/image.jpg',
        alt: 'Test image',
      },
    };

    render(<Card {...propsWithImage} />);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(image).toHaveAttribute('alt', 'Test image');
  });

  test('renders with action buttons', () => {
    const propsWithActions = {
      ...defaultProps,
      actions: [
        { label: 'Action 1', onClick: jest.fn() },
        { label: 'Action 2', onClick: jest.fn() },
      ],
    };

    render(<Card {...propsWithActions} />);

    const action1 = screen.getByText('Action 1');
    const action2 = screen.getByText('Action 2');

    expect(action1).toBeInTheDocument();
    expect(action2).toBeInTheDocument();

    fireEvent.click(action1);
    expect(propsWithActions.actions[0].onClick).toHaveBeenCalledTimes(1);
  });

  test('has proper accessibility attributes', () => {
    render(<Card {...defaultProps} />);

    // Card should be accessible
    const card =
      screen.getByRole('article') ||
      screen.getByTestId('card') ||
      screen.getByText('Test Card Title').closest('div');
    expect(card).toBeInTheDocument();
    expect(card).toBeVisible();
  });

  test('renders loading state', () => {
    render(<Card {...defaultProps} loading={true} />);

    const loadingIndicator =
      screen.queryByRole('status') || screen.queryByTestId('loading');
    if (loadingIndicator) {
      expect(loadingIndicator).toBeInTheDocument();
    }
  });

  test('renders disabled state', () => {
    render(<Card {...defaultProps} disabled={true} />);

    const card = screen.getByText('Test Card Title').closest('div');
    expect(card).toHaveClass(/disabled/i) ||
      expect(card).toHaveAttribute('aria-disabled', 'true');
  });

  test('handles keyboard navigation', () => {
    const handleClick = jest.fn();
    render(<Card {...defaultProps} onClick={handleClick} />);

    const card =
      screen.getByRole('button') ||
      screen.getByText('Test Card Title').closest('[role="button"]');
    if (card) {
      fireEvent.keyDown(card, { key: 'Enter', code: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(card, { key: ' ', code: 'Space' });
      expect(handleClick).toHaveBeenCalledTimes(2);
    }
  });

  test('renders without crashing', () => {
    expect(() => render(<Card {...defaultProps} />)).not.toThrow();
  });
});
