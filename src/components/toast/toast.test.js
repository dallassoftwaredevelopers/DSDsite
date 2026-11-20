import { act, fireEvent, render, screen } from '@testing-library/react';
import { ToastProvider, useToast } from '@/contexts/ToastContext';

function Trigger({ type }) {
  const { showToast } = useToast();
  return (
    <button onClick={() => showToast('Form response', type)}>Submit</button>
  );
}

test.each([
  ['success', 'status'],
  ['error', 'alert'],
])('announces and dismisses a %s response', (type, role) => {
  render(
    <ToastProvider>
      <Trigger type={type} />
    </ToastProvider>
  );
  expect(screen.queryByRole(role)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  expect(screen.getByRole(role)).toHaveTextContent('Form response');
  fireEvent.click(screen.getByRole('button', { name: 'Dismiss notification' }));
  expect(screen.queryByRole(role)).not.toBeInTheDocument();
});

test('removes a notification after its display duration', () => {
  jest.useFakeTimers();
  try {
    render(
      <ToastProvider>
        <Trigger type='success' />
      </ToastProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    act(() => jest.advanceTimersByTime(2999));
    expect(screen.getByRole('status')).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(1));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  } finally {
    jest.useRealTimers();
  }
});
