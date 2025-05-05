import { memo } from 'react';
import Person from '../person/person';
import { Speaker } from '@/types/globalTypes';

import styles from './peopleList.module.css';

function PeopleListComponent({
  peopleData,
  isAdmin = false,
}: {
  peopleData: Speaker[];
  isAdmin?: boolean;
}) {
  return (
    <div className={styles.peopleList}>
      {peopleData
        .filter((p) => p.isAdmin === isAdmin)
        .sort((a, b) => a.fullName.localeCompare(b.fullName))
        .map((person) => (
          <Person
            key={person.documentId}
            fullName={person.fullName}
            twitterUrl={person.xUrl}
            linkedinUrl={person.linkedInUrl}
            imageUrl={person.imageUrl}
          />
        ))}
    </div>
  );
}

const PeopleList = memo(PeopleListComponent);
export default PeopleList;
