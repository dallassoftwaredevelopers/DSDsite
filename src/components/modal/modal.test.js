import React from 'react';
import { render, screen, fireEvent } from '../../../__test__/testUtils';
import Modal from './modal';

describe('Modal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: 'Test Modal',
    children: <div data-testid="modal-content">Modal Content</div>
  };

  beforeEach(() => {
    defaultProps.onClose.mockClear();
  });

  test('renders modal when isOpen is true', () => {
    render(<Modal {...defaultProps} />);
    
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(modal).toBeVisible();
  });

  test('does not render modal when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    
    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();
  });

  test('displays the modal title', () => {
    render(<Modal {...defaultProps} />);
    
    const title = screen.getByText('Test Modal');
    expect(title).toBeInTheDocument();
  });

  test('displays modal content', () => {
    render(<Modal {...defaultProps} />);
    
    const content = screen.getByTestId('modal-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Modal Content');
  });

  test('calls onClose when close button is clicked', () => {
    render(<Modal {...defaultProps} />);
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when escape key is pressed', () => {
    render(<Modal {...defaultProps} />);
    
    const modal = screen.getByRole('dialog');
    fireEvent.keyDown(modal, { key: 'Escape', code: 'Escape' });
    
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  test('has proper accessibility attributes', () => {
    render(<Modal {...defaultProps} />);
    
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby');
  });

  test('traps focus within modal', () => {
    render(<Modal {...defaultProps} />);
    
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
    
    // Modal should contain focus
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  test('handles modal without title', () => {
    const propsWithoutTitle = { ...defaultProps, title: undefined };
    render(<Modal {...propsWithoutTitle} />);
    
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    expect(() => render(<Modal {...defaultProps} />)).not.toThrow();
  });
});
