import React from 'react';
import Modal from '@/components/modal/modal';
import SpeakerForm from '@/components/speakerForm/index';

interface CommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommunityModal({ isOpen, onClose }: CommunityModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <SpeakerForm
        onSubmit={onClose}
        onCancel={onClose}
      />
    </Modal>
  );
}
