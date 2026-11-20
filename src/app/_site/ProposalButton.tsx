'use client';
import { useCallback, useId, useState } from 'react';
import dynamic from 'next/dynamic';
import { FiArrowRight } from 'react-icons/fi';
import Modal from '@/components/modal/modal';
import s from './interior.module.css';
const SpeakerForm = dynamic(
  () => import('@/components/speakerForm/speakerForm'),
  { loading: () => <p>Loading the proposal form…</p> }
);
export default function ProposalButton({
  text = 'Propose a talk',
  secondary = false,
}: {
  text?: string;
  secondary?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const titleId = useId();
  return (
    <>
      <button
        type='button'
        className={secondary ? s.textLink : s.button}
        onClick={() => setOpen(true)}
      >
        {text}
        <FiArrowRight aria-hidden />
      </button>
      <Modal isOpen={open} onClose={close} ariaLabelledBy={titleId}>
        <h2 id={titleId} className={s.formTitle}>
          Your talk proposal.
        </h2>
        <SpeakerForm onCancel={close} onSubmit={close} />
      </Modal>
    </>
  );
}
