'use client';

import React from 'react';
import styles from './CohortsApplication.module.css';
import Button from '@/components/button/button';
import NotificationForm from '../notificationForm';
import { LABELS } from '@/app/labels';

interface CohortStatus {
  documentId: number;
  statusType: string;
  message: string;
  active: boolean;
}

interface CohortsApplicationProps {
  sectionRef?: (el: HTMLElement | null) => void;
  isVisible?: boolean;
  currentCohortStatusData: CohortStatus;
  actionLinks?: { linkName: string; link: string }[];
}

const CohortsApplication: React.FC<CohortsApplicationProps> = ({
  sectionRef,
  isVisible,
  currentCohortStatusData,
  actionLinks,
}) => {
  const handleApplyNow = () => {
    if (!actionLinks) return;
    const cohortSignupLink = actionLinks.find(
      (x: any) => x.linkName === 'cohortSignup'
    )?.link;
    window.open(cohortSignupLink, '_blank');
  };

  return (
    <section
      id="apply-section"
      ref={sectionRef}
      className={`${styles.applySectionContainer} ${styles.darkBackground} ${
        isVisible ? styles.sectionVisible : ''
      }`}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.applicationSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {LABELS.cohorts.apply.title}
            </h2>
            <p className={styles.sectionDescription}>
              {LABELS.cohorts.apply.description}
            </p>
          </div>

          <div className={styles.statusCard}>
            <div className={styles.statusIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z" />
              </svg>
            </div>
            <div className={styles.statusMessage}>
              <p>{currentCohortStatusData.message}</p>
            </div>

            {currentCohortStatusData.statusType === 'open' && (
              <div className={styles.applySteps}>
                <h3>{LABELS.cohorts.apply.applicationProcess.title}</h3>
                <ol className={styles.stepsList}>
                  <li>
                    <span className={styles.stepNumber}>
                      {LABELS.cohorts.apply.applicationProcess.steps.submit.number}
                    </span>
                    <div className={styles.stepContent}>
                      <h4>
                        {LABELS.cohorts.apply.applicationProcess.steps.submit.title}
                      </h4>
                      <p>
                        {LABELS.cohorts.apply.applicationProcess.steps.submit.description}
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className={styles.stepNumber}>
                      {LABELS.cohorts.apply.applicationProcess.steps.assessment.number}
                    </span>
                    <div className={styles.stepContent}>
                      <h4>
                        {LABELS.cohorts.apply.applicationProcess.steps.assessment.title}
                      </h4>
                      <p>
                        {LABELS.cohorts.apply.applicationProcess.steps.assessment.description}
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className={styles.stepNumber}>
                      {LABELS.cohorts.apply.applicationProcess.steps.interview.number}
                    </span>
                    <div className={styles.stepContent}>
                      <h4>
                        {LABELS.cohorts.apply.applicationProcess.steps.interview.title}
                      </h4>
                      <p>
                        {LABELS.cohorts.apply.applicationProcess.steps.interview.description}
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className={styles.stepNumber}>
                      {LABELS.cohorts.apply.applicationProcess.steps.placement.number}
                    </span>
                    <div className={styles.stepContent}>
                      <h4>
                        {LABELS.cohorts.apply.applicationProcess.steps.placement.title}
                      </h4>
                      <p>
                        {LABELS.cohorts.apply.applicationProcess.steps.placement.description}
                      </p>
                    </div>
                  </li>
                </ol>
                <Button
                  buttonText={LABELS.cohorts.apply.applyNow}
                  onClick={handleApplyNow}
                />
              </div>
            )}

            {currentCohortStatusData.statusType === 'closed' && (
              <div className={styles.notificationFormWrapper}>
                <h3>{LABELS.cohorts.apply.notification.title}</h3>
                <p className={styles.notificationDescription}>
                  {LABELS.cohorts.apply.notification.description}
                </p>
                <NotificationForm />
                <div className={styles.joinDiscord}>
                  <p>{LABELS.cohorts.apply.notification.discordPrompt}</p>
                  <a
                    href="https://discord.gg/pWGt6JMV9t"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.discordButton}
                  >
                    <span className={styles.discordIcon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z" />
                      </svg>
                    </span>
                    <span>{LABELS.cohorts.apply.notification.joinDiscord}</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CohortsApplication;
