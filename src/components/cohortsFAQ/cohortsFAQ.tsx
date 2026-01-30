'use client';

import React, { useState } from 'react';
import styles from './cohortsFAQ.module.css';
import { LABELS } from '@/app/labels';

interface CohortsFAQProps {
  sectionRef?: (el: HTMLElement | null) => void;
  isVisible?: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
}

export default function CohortsFAQ({ sectionRef, isVisible }: CohortsFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems: FAQItem[] = LABELS.cohorts.faq.items;

  return (
    <section
      ref={sectionRef}
      className={`${styles.faqSection} ${isVisible ? styles.visible : ''}`}
      aria-labelledby="faq-heading"
    >
      <div className={styles.container}>
        <h2 id="faq-heading" className={styles.heading}>
          {LABELS.cohorts.faq.title}
        </h2>
        <p className={styles.subheading}>{LABELS.cohorts.faq.subtitle}</p>

        <div className={styles.faqList}>
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{item.question}</span>
                <span className={styles.faqIcon} aria-hidden="true">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                className={styles.faqAnswer}
                hidden={openIndex !== index}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
