import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import styles from './speakerForm.module.css';
import ReCAPTCHA from 'react-google-recaptcha';
import { Message } from '@/types/globalTypes';
import { useGlobalState } from '@/app/hooks/useGlobalState/useGlobalState';

interface FormData {
  fullName: string;
  email: string;
  topic: string;
  briefDescription: string;
  token: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  topic?: string;
  briefDescription?: string;
}

const localEnv =
  process.env.NODE_ENV === 'development' &&
  process.env.NEXT_PUBLIC_APPWRITE_HASKEY === 'false';

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY ?? '';

export default function SpeakerForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: () => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    topic: '',
    briefDescription: '',
    token: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState<Message | null>(null);

  const { setToast } = useGlobalState();
  const captchaRef = useRef<ReCAPTCHA>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.topic.trim()) {
      newErrors.topic = 'Topic is required';
    } else if (formData.topic.length > 100) {
      newErrors.topic = 'Topic must be under 100 characters';
    }

    if (!formData.briefDescription.trim()) {
      newErrors.briefDescription = 'Description is required';
    } else if (formData.briefDescription.length > 500) {
      newErrors.briefDescription = 'Description must be under 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setMessage(null);
    e.preventDefault();
    if (validate()) {
      const token = localEnv ? 'localEnv' : captchaRef.current?.getValue();
      if (!(token || localEnv)) {
        setMessage({
          message: 'Please complete the reCAPTCHA!',
          type: 'error',
        });
        return;
      }

      formData.token = token ?? '';

      try {
        await fetch('/api/speakerRequestForm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        setToast({
          type: 'success',
          message: 'Your submission was successful!',
        });
        onSubmit();
      } catch (error) {
        setToast({
          type: 'error',
          message: 'There was an error submitting your form. Please try again.',
        });
        console.error('error', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Full Name</label>
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
        <label className={styles.formLabel}>Email</label>
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
        <label className={styles.formLabel}>Topic</label>
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
        <label className={styles.formLabel}>Brief Description</label>
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
        All speaking engagements are for <b>IN PERSON ONLY</b>. You can submit
        as many applications to speak as you like. We will review each
        application and get back to you as soon as possible. This is not a
        guarantee of a speaking slot. We will do our best to accommodate all
        request, but please understand that we may not be able to accept every
        request.
      </p>
      <p className='smText'>
        Thank you for your interest in speaking at our event! We look forward to
        hearing from you.
      </p>

      <div className={styles.recaptcha}>
        {!localEnv && <ReCAPTCHA sitekey={siteKey} ref={captchaRef} />}
      </div>
      <button type='submit' className={styles.submitButton}>
        Submit
      </button>
      <button type='button' className={styles.cancelButton} onClick={onCancel}>
        Cancel
      </button>

      <p>{message?.message}</p>
    </form>
  );
}
