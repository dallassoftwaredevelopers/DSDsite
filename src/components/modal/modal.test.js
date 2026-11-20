import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './modal';

function dialog(isOpen, onClose) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabelledBy='dialog-heading'>
      <h2 id='dialog-heading'>Meetup details</h2>
      <a href='/meetups'>Meetups</a>
    </Modal>
  );
}

test('opens a named dialog and restores focus and scrolling when closed', async () => {
  const trigger = document.createElement('button');
  document.body.appendChild(trigger);
  trigger.focus();
  const close = jest.fn();
  const { rerender } = render(dialog(false, close));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  rerender(dialog(true, close));
  expect(
    screen.getByRole('dialog', { name: 'Meetup details' })
  ).toHaveAttribute('aria-modal', 'true');
  expect(document.body.style.overflow).toBe('hidden');
  const closeButton = screen.getByRole('button', { name: /close modal/i });
  await waitFor(() => expect(closeButton).toHaveFocus());
  const user = userEvent.setup();
  await user.tab({ shift: true });
  expect(screen.getByRole('link', { name: 'Meetups' })).toHaveFocus();
  await user.tab();
  expect(closeButton).toHaveFocus();
  await user.keyboard('{Escape}');
  expect(close).toHaveBeenCalledTimes(1);
  await user.click(closeButton);
  expect(close).toHaveBeenCalledTimes(2);
  rerender(dialog(false, close));
  expect(trigger).toHaveFocus();
  expect(document.body.style.overflow).toBe('');
  trigger.remove();
});
