import React, { useState, useRef } from 'react';
import styles from './speakerForm.module.css';
import ReCAPTCHA from 'react-google-recaptcha';
import { Message } from '@/types';
import { useToast } from '@/contexts/ToastContext';
import { useForm } from '@/hooks/useForm';
import { LABELS } from '@/app/labels';

interface FormData {
  fullName: string;
  email: string;
  linkedInUrl: string;
  topic: string;
  briefDescription: string;
  token: string;
}

const localEnv =
  process.env.NODE_ENV === 'development' &&
  process.env.NEXT_PUBLIC_APPWRITE_HASKEY === 'false';

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY ?? '';

function isValidHttpUrl(urlValue: string): boolean {
  try {
    const url = new URL(urlValue);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
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
    setValue,
    validate,
  } = useForm<FormData>(
    {
      fullName: '',
      email: '',
      linkedInUrl: '',
      topic: '',
      briefDescription: '',
      token: '',
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
        localEnv || !hasValidSiteKey
          ? 'localEnv'
          : captchaRef.current?.getValue();

      if (!token && hasValidSiteKey && !localEnv) {
        setMessage({
          message: LABELS.speakerForm.errors.recaptcha_required,
          type: 'error',
        });
        setIsSubmitting(false);
        return;
      }

      setValue('token', token ?? '');

      try {
        const response = await fetch('/api/speakerRequestForm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData, token: token ?? '' }),
        });

        if (response.status === 400) {
          showToast(response.statusText, 'error');
          setIsSubmitting(false);
          return;
        }

        showToast(LABELS.speakerForm.errors.submit_success, 'success');
        onSubmit();
      } catch (error) {
        showToast(LABELS.speakerForm.errors.submit_error, 'error');
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          {LABELS.speakerForm.labels.full_name}
        </label>
        <input
          type='text'
          name='fullName'
          value={formData.fullName}
          onChange={handleChange}
          className={styles.formInput}
          required
        />
        {errors.fullName && (
          <p className={styles.errorText}>{errors.fullName}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          {LABELS.speakerForm.labels.email}
        </label>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          className={styles.formInput}
          required
        />
        {errors.email && <p className={styles.errorText}>{errors.email}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          {LABELS.speakerForm.labels.linked_in_url}
        </label>
        <input
          type='linkedInUrl'
          name='linkedInUrl'
          value={formData.linkedInUrl}
          onChange={handleChange}
          className={styles.formInput}
          required
        />
        {errors.linkedInUrl && (
          <p className={styles.errorText}>{errors.linkedInUrl}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          {LABELS.speakerForm.labels.topic}
        </label>
        <input
          type='text'
          name='topic'
          value={formData.topic}
          onChange={handleChange}
          maxLength={100}
          className={styles.formInput}
          required
        />
        <p className={styles.formHelperText}>{formData.topic.length}/100</p>
        {errors.topic && <p className={styles.errorText}>{errors.topic}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          {LABELS.speakerForm.labels.brief_description}
        </label>
        <textarea
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
          <p className={styles.errorText}>{errors.briefDescription}</p>
        )}
      </div>

      <p className='smText'>
        {LABELS.speakerForm.labels.in_person_notice_line1}
      </p>
      <p className='smText'>
        {LABELS.speakerForm.labels.in_person_notice_line2}
      </p>

      <div className={styles.recaptcha}>
        {!localEnv && siteKey && siteKey !== 'RECAPTCHA_SITEKEY' && (
          <ReCAPTCHA sitekey={siteKey} ref={captchaRef} />
        )}
      </div>
      <button type='submit' className={styles.submitButton}>
        {LABELS.speakerForm.labels.submit}
      </button>
      <button type='button' className={styles.cancelButton} onClick={onCancel}>
        {LABELS.speakerForm.labels.cancel}
      </button>

      <p>{message?.message}</p>
    </form>
  );
}
