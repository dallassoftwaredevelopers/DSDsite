import React, { useState, useRef } from 'react';
import styles from './speakerForm.module.css';
import ReCAPTCHA from 'react-google-recaptcha';
import type { Message } from '@/types';
import { useMockData } from '../../../lib/env';
import { useToast } from '@/contexts/ToastContext';
import { useForm } from '@/hooks/useForm';
import { LABELS } from '@/app/labels';

interface FormData {
  fullName: string;
  email: string;
  linkedInUrl: string;
  topic: string;
  briefDescription: string;
}

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY ?? '';

function isValidHttpUrl(urlValue: string): boolean {
  try {
    const url = new URL(urlValue);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export default function SpeakerForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: () => void;
  onCancel: () => void;
}) {
  const {
    values: formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    validate,
  } = useForm<FormData>(
    {
      fullName: '',
      email: '',
      linkedInUrl: '',
      topic: '',
      briefDescription: '',
    },
    {
      fullName: [{ isFieldRequired: true }],
      email: [
        { isFieldRequired: true },
        { validationRegexPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      ],
      linkedInUrl: [
        { isFieldRequired: true },
        {
          customValidationFunction: (value) =>
            !isValidHttpUrl(value as string)
              ? LABELS.speakerForm.errors.linked_in_invalid
              : undefined,
        },
      ],
      topic: [{ isFieldRequired: true }, { maximumCharacterLength: 100 }],
      briefDescription: [
        { isFieldRequired: true },
        { maximumCharacterLength: 500 },
      ],
    }
  );

  const [message, setMessage] = useState<Message | null>(null);
  const { showToast } = useToast();
  const captchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setMessage(null);
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);

      const hasValidSiteKey = siteKey && siteKey !== 'RECAPTCHA_SITEKEY';
      const token =
        useMockData || !hasValidSiteKey
          ? 'localEnv'
          : captchaRef.current?.getValue();

      if (!token && hasValidSiteKey && !useMockData) {
        setMessage({
          message: LABELS.speakerForm.errors.recaptcha_required,
          type: 'error',
        });
        setIsSubmitting(false);
        return;
      }

      try {
        const response = await fetch('/api/speakerRequestForm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData, token: token ?? '' }),
        });

        if (!response.ok) {
          showToast(
            response.statusText || LABELS.speakerForm.errors.submit_error,
            'error'
          );
          setIsSubmitting(false);
          return;
        }

        showToast(LABELS.speakerForm.errors.submit_success, 'success');
        onSubmit();
      } catch {
        showToast(LABELS.speakerForm.errors.submit_error, 'error');
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label htmlFor='proposal-fullName' className={styles.formLabel}>
          {LABELS.speakerForm.labels.full_name}
        </label>
        <input
          type='text'
          id='proposal-fullName'
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={
            errors.fullName ? 'proposal-fullName-error' : undefined
          }
          name='fullName'
          value={formData.fullName}
          onChange={handleChange}
          className={styles.formInput}
          required
        />
        {errors.fullName && (
          <p id='proposal-fullName-error' className={styles.errorText}>
            {errors.fullName}
          </p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor='proposal-email' className={styles.formLabel}>
          {LABELS.speakerForm.labels.email}
        </label>
        <input
          type='email'
          id='proposal-email'
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'proposal-email-error' : undefined}
          name='email'
          value={formData.email}
          onChange={handleChange}
          className={styles.formInput}
          required
        />
        {errors.email && (
          <p id='proposal-email-error' className={styles.errorText}>
            {errors.email}
          </p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor='proposal-linkedInUrl' className={styles.formLabel}>
          {LABELS.speakerForm.labels.linked_in_url}
        </label>
        <input
          type='url'
          id='proposal-linkedInUrl'
          aria-invalid={Boolean(errors.linkedInUrl)}
          aria-describedby={
            errors.linkedInUrl ? 'proposal-linkedInUrl-error' : undefined
          }
          name='linkedInUrl'
          value={formData.linkedInUrl}
          onChange={handleChange}
          className={styles.formInput}
          required
        />
        {errors.linkedInUrl && (
          <p id='proposal-linkedInUrl-error' className={styles.errorText}>
            {errors.linkedInUrl}
          </p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor='proposal-topic' className={styles.formLabel}>
          {LABELS.speakerForm.labels.topic}
        </label>
        <input
          type='text'
          id='proposal-topic'
          aria-invalid={Boolean(errors.topic)}
          aria-describedby={errors.topic ? 'proposal-topic-error' : undefined}
          name='topic'
          value={formData.topic}
          onChange={handleChange}
          maxLength={100}
          className={styles.formInput}
          required
        />
        <p className={styles.formHelperText}>{formData.topic.length}/100</p>
        {errors.topic && (
          <p id='proposal-topic-error' className={styles.errorText}>
            {errors.topic}
          </p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor='proposal-briefDescription' className={styles.formLabel}>
          {LABELS.speakerForm.labels.brief_description}
        </label>
        <textarea
          id='proposal-briefDescription'
          aria-invalid={Boolean(errors.briefDescription)}
          aria-describedby={
            errors.briefDescription
              ? 'proposal-briefDescription-error'
              : undefined
          }
          name='briefDescription'
          value={formData.briefDescription}
          onChange={handleChange}
          maxLength={500}
          className={styles.formInput}
          required
          rows={5}
        />
        <p className={styles.formHelperText}>
          {formData.briefDescription.length}/500
        </p>
        {errors.briefDescription && (
          <p id='proposal-briefDescription-error' className={styles.errorText}>
            {errors.briefDescription}
          </p>
        )}
      </div>

      <p>{LABELS.speakerForm.labels.in_person_notice_line1}</p>
      <p>{LABELS.speakerForm.labels.in_person_notice_line2}</p>

      <div className={styles.recaptcha}>
        {!useMockData && siteKey && siteKey !== 'RECAPTCHA_SITEKEY' && (
          <ReCAPTCHA sitekey={siteKey} ref={captchaRef} />
        )}
      </div>
      <button
        disabled={isSubmitting}
        type='submit'
        className={styles.submitButton}
      >
        {LABELS.speakerForm.labels.submit}
      </button>
      <button type='button' className={styles.cancelButton} onClick={onCancel}>
        {LABELS.speakerForm.labels.cancel}
      </button>

      <p role='status'>{message?.message}</p>
    </form>
  );
}
