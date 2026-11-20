'use client';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from './notification.module.css';
import type { Message } from '@/types';
import { useMockData } from '../../../lib/env';

const emptySignup = { name: '', email: '' };

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY || '';
const hasValidSiteKey = siteKey && siteKey !== 'RECAPTCHA_SITEKEY';

export default function NotificationForm() {
  const [formData, setFormData] = useState(emptySignup);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const captchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = useMockData
      ? 'localEnv'
      : hasValidSiteKey
        ? captchaRef.current?.getValue()
        : 'no-recaptcha';

    if (!useMockData && hasValidSiteKey && !token) {
      setMessage({
        message: 'Are you a robot? Please complete the reCAPTCHA',
        type: 'error',
      });
      return;
    }

    setPending(true);
    setMessage(null);
    const submitData = { ...formData, token: token ?? '' };

    try {
      const response = await fetch('/api/notificationForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const detail = await response.json().catch(() => null);
        setMessage({
          message:
            detail?.message ||
            'Your signup could not be saved. Please try again.',
          type: 'error',
        });
        return;
      }

      setMessage({
        message: 'Success! You will be notified when the next cohort opens.',
        type: 'success',
      });

      setFormData(emptySignup);
    } catch {
      setMessage({
        message: 'We could not reach the signup form. Please try again.',
        type: 'error',
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <div className={styles.notificationFormContainer}>
      <form onSubmit={handleSubmit} method='post'>
        <div className={styles.formGroup}>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            name='name'
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.recaptcha}>
          {!useMockData && hasValidSiteKey && (
            <ReCAPTCHA sitekey={siteKey} ref={captchaRef} />
          )}
          {!useMockData && !hasValidSiteKey && (
            <div className={styles.recaptchaPlaceholder}>
              <p>
                reCAPTCHA verification is temporarily unavailable. Please try
                again later.
              </p>
            </div>
          )}
        </div>
        <button className={styles.submitBtn} disabled={pending} type='submit'>
          Get Notified
        </button>
      </form>
      {message && (
        <div
          role='status'
          className={[
            styles.formMessage,
            message.type === 'error'
              ? styles.errorMessage
              : styles.successMessage,
          ].join(' ')}
        >
          {message.message}
        </div>
      )}
    </div>
  );
}
