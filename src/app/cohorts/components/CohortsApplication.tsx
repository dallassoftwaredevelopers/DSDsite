import type { ActionLink, CohortStatus } from '@/types';
import { LABELS } from '../../labels';
import { externalLinks } from '../../_constants';
import { Action, SectionTitle } from '../../_site/Editorial';
import s from '../../_site/interior.module.css';
import NotificationForm from '../notificationForm';
import { sanitizeExternalUrl } from '@/utils/urlSanitizer';
export default function CohortsApplication({
  currentCohortStatusData: status,
  actionLinks,
}: {
  currentCohortStatusData: CohortStatus;
  actionLinks: ActionLink[];
}) {
  const open = status.statusType === 'open';
  const signup = sanitizeExternalUrl(
    actionLinks.find((a) => a.linkName === 'cohortSignup' && a.active)?.link
  );
  return (
    <section className={s.warm} id='apply-section'>
      <div className={s.split}>
        <div>
          <SectionTitle
            note='Applications'
            title={
              open
                ? 'Join the next cohort.'
                : status.statusType === 'in_progress'
                  ? 'A cohort is underway.'
                  : 'Get the next opening.'
            }
          />
          <p className={s.muted}>{status.message}</p>
          <Action href={externalLinks.discordUrl} secondary>
            Join the cohort conversation
          </Action>
        </div>
        {open ? (
          <div className={s.applyPanel}>
            <h3>How to apply</h3>
            <ol>
              {Object.values(LABELS.cohorts.apply.applicationProcess.steps).map(
                (step) => (
                  <li key={step.number}>
                    <strong>{step.title}.</strong> {step.description}
                  </li>
                )
              )}
            </ol>
            <Action href={signup || externalLinks.discordUrl}>
              {signup ? 'Start your application' : 'Ask about applications'}
            </Action>
          </div>
        ) : status.statusType === 'closed' ? (
          <div className={s.applyPanel}>
            <h3>Notify me by email</h3>
            <p>
              Leave your name and email and we’ll let you know when applications
              open.
            </p>
            <NotificationForm />
          </div>
        ) : null}
      </div>
    </section>
  );
}
