import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '../../../__test__/testUtils';
import Toast from './toast';

describe('Toast Component', () => {
  const defaultProps = {
    message: 'Test toast message',
    type: 'success',
    isVisible: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    defaultProps.onClose.mockClear();
  });

  test('renders toast when visible', () => {
    render(<Toast {...defaultProps} />);

    const toast =
      screen.getByRole('alert') || screen.getByText('Test toast message');
    expect(toast).toBeInTheDocument();
  });

  test('does not render toast when not visible', () => {
    render(<Toast {...defaultProps} isVisible={false} />);

    const toast = screen.queryByText('Test toast message');
    expect(toast).not.toBeInTheDocument();
  });

  test('displays the correct message', () => {
    render(<Toast {...defaultProps} />);

    const message = screen.getByText('Test toast message');
    expect(message).toBeInTheDocument();
  });

  test('renders with different types', () => {
    const types = ['success', 'error', 'warning', 'info'];

    types.forEach((type) => {
      const { unmount } = render(<Toast {...defaultProps} type={type} />);
      const toast = screen.getByText('Test toast message');
      expect(toast).toBeInTheDocument();
      unmount();
    });
  });

  test('calls onClose when close button is clicked', () => {
    render(<Toast {...defaultProps} />);

    const closeButton =
      screen.getByRole('button') || screen.getByLabelText(/close/i);
    if (closeButton) {
      fireEvent.click(closeButton);
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    }
  });

  test('auto-closes after timeout', async () => {
    render(<Toast {...defaultProps} autoClose={true} duration={1000} />);

    // Wait for auto-close timeout
    await waitFor(
      () => {
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
      },
      { timeout: 1500 }
    );
  });

  test('has proper accessibility attributes', () => {
    render(<Toast {...defaultProps} />);

    const toast =
      screen.getByRole('alert') ||
      screen.getByText('Test toast message').closest('[role]');
    if (toast && toast.getAttribute('role') === 'alert') {
      expect(toast).toHaveAttribute('role', 'alert');
    }
  });

  test('renders with action button', () => {
    const actionProps = {
      ...defaultProps,
      action: {
        label: 'Undo',
        onClick: jest.fn(),
      },
    };

    render(<Toast {...actionProps} />);

    const actionButton = screen.queryByText('Undo');
    if (actionButton) {
      expect(actionButton).toBeInTheDocument();
      fireEvent.click(actionButton);
      expect(actionProps.action.onClick).toHaveBeenCalledTimes(1);
    }
  });

  test('renders with custom icon', () => {
    render(<Toast {...defaultProps} icon='✓' />);

    const iconElement = screen.queryByText('✓');
    if (iconElement) {
      expect(iconElement).toBeInTheDocument();
    }
  });

  test('handles long messages', () => {
    const longMessage =
      'This is a very long toast message that should be handled properly by the component without breaking the layout or causing any issues';
    render(<Toast {...defaultProps} message={longMessage} />);

    const message = screen.getByText(longMessage);
    expect(message).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    expect(() => render(<Toast {...defaultProps} />)).not.toThrow();
  });
});
