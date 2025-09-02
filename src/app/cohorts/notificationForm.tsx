import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from './cohorts.module.css';
import { Message } from '@/types';

class NotificationFormClass {
  name: string;
  email: string;
  token: string;

  constructor(name: string, email: string, token: string) {
    this.name = name;
    this.email = email;
    this.token = token;
  }
}

const localEnv =
  process.env.NODE_ENV === 'development' &&
  process.env.NEXT_PUBLIC_APPWRITE_HASKEY === 'false';

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY || '';
const hasValidSiteKey = siteKey && siteKey !== 'RECAPTCHA_SITEKEY' && siteKey !== '';

export default function NotificationForm() {
  const [formData, setFormData] = useState(
    new NotificationFormClass('', '', '')
  );
  const [message, setMessage] = useState<Message | null>(null);

  const captchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const token = localEnv ? 'localEnv' : (hasValidSiteKey ? captchaRef.current?.getValue() : 'no-recaptcha');
    
    if (!localEnv && hasValidSiteKey && !token) {
      setMessage({
        message: 'Are you a robot? Please complete the reCAPTCHA',
        type: 'error',
      });
      return;
    }

    formData.token = token ?? '';

    try {
      const response = await fetch('/api/notificationForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        if (errorResponse.data.message) {
          setMessage({
            message: errorResponse.data.message.message,
            type: 'error',
          });
        }
        return;
      }

      setMessage({
        message: 'Success! You will be notified when the next cohort opens.',
        type: 'success',
      });

      setFormData(new NotificationFormClass('', '', ''));
    } catch (error) {
      console.error('error', error);
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
          {!localEnv && hasValidSiteKey && (
            <ReCAPTCHA sitekey={siteKey} ref={captchaRef} />
          )}
          {!localEnv && !hasValidSiteKey && (
            <div className={styles.recaptchaPlaceholder}>
              <p style={{ color: '#666', fontSize: '14px', textAlign: 'center' }}>
                reCAPTCHA verification is temporarily unavailable. Please try again later.
              </p>
            </div>
          )}
        </div>
        <button className={styles.submitBtn} type='submit'>
          Get Notified
        </button>
      </form>
      {message && (
        <div
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
