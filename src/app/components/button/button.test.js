import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';
import styles from './button.module.css';

jest.mock('./button.module.css', () => ({
  button: 'button',
  buttonPrimary: 'button--primary',
  buttonIcon: 'button__icon',
}));

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

test('renders correctly with primary variant', () => {
  const { asFragment } = render(
    <Button buttonText='Primary Button' variant='primary' />
  );
  expect(asFragment()).toMatchSnapshot();
});

// test('has the correct class when variant is primary', () => {
//   render(<Button buttonText='Primary Button' variant='primary' />);
//   const buttonElement = screen.getByTestId('button-primary');
//   expect(buttonElement).toHaveStyle('background-color: #3c3db9');
// });

test('shows icon when showIcon is true', () => {
  render(<Button buttonText='Button with Icon' showIcon />);
  const iconElement = screen.getByTestId('button-icon');
  expect(iconElement).toBeInTheDocument();
});
