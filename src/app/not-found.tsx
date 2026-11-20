import { Action, PageHero } from './_site/Editorial';
import s from './_site/interior.module.css';
export default function NotFound() {
  return (
    <div className={s.page}>
      <PageHero
        label='404 · Page not found'
        title='Lost your'
        accent='place?'
        description='That page may have moved. Head back to the homepage or find the next DSD meetup.'
      >
        <Action href='/'>Back to the homepage</Action>
        <Action href='/meetups' secondary>
          Find a meetup
        </Action>
      </PageHero>
    </div>
  );
}
