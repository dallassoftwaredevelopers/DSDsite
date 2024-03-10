import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('renders correct text', () => {
  render(<Button buttonText='Click me' />);
  const buttonElement = screen.getByText(/click me/i);
  expect(buttonElement).toBeInTheDocument();
});

test('calls onClick prop when clicked', () => {
  const handleClick = jest.fn();
  render(<Button buttonText='Click me' onClick={handleClick} />);
  fireEvent.click(screen.getByText(/click me/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('has a class when variant is primary', () => {
  render(<Button buttonText='Primary Button' variant='primary' />);
  const buttonElement = screen.getByText(/primary button/i);
  expect(buttonElement).toHaveAttribute('class');
});

test('shows icon when showIcon is true', () => {
  render(<Button buttonText='Button with Icon' showIcon />);
  const iconElement = screen.getByTestId('button-icon');
  expect(iconElement).toBeInTheDocument();
});
