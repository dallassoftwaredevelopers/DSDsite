import Bento from './bento';
import styles from './bento.module.css';
import Image from 'next/image';

interface BentoData {
  id: number;
  url: string;
  alt: string;
}

const bentoImages: BentoData[] = [
  {
    id: 1,
    url: '/assets/twoPeopleHelp.png',
    alt: 'two people help',
  },
  {
    id: 2,
    url: '/assets/meetupGroupShot1.png',
    alt: 'meetup group picture 1',
  },
  {
    id: 3,
    url: '/assets/meetupGroupShot2.png',
    alt: 'meetup group picture 2',
  },
  {
    id: 4,
    url: '/assets/meetupGroupShot3.png',
    alt: 'meetup group picture 3',
  },
  {
    id: 5,
    url: '/assets/meetupGroupShot4.png',
    alt: 'meetup group picture 4',
  },
  {
    id: 6,
    url: '/assets/meetupGroupShot5.png',
    alt: 'meetup group picture 5',
  },
  {
    id: 7,
    url: '/assets/twoPeopleHelpLaptop.png',
    alt: 'two people help on laptop',
  },
  {
    id: 8,
    url: '/assets/groupTableLaptop.png',
    alt: 'group table collaborating with laptops',
  },
];

export default function BentoSection() {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.bentoFirstContainer}>
        <Bento key={bentoImages[0].id}>
        <div>
          <Image
            className={styles.imageStyle}
            src={bentoImages[0].url}
            alt={bentoImages[0].alt}
            width={575}
            height={750}
          />
        </div>
      </Bento>
      </div>
      

      <div className={styles.bentoSecondContainer}>
        {bentoImages.slice(1, 4).map((card) => (
          <Bento key={card.id}>
            <div className={styles.imageContainer}>
              <Image
                src={card.url}
                alt={card.alt}
                className={styles.imageStyle}
                sizes='400vw'
                width={575}
                height={450}
              />
            </div>
          </Bento>
        ))}
      </div>

      <div className={styles.bentoThirdContainer}>
        <Bento key={bentoImages[5].id}>
          <div className={styles.imageContainer}>
            <Image
              className={styles.imageStyle}
              src={bentoImages[5].url}
              alt={bentoImages[5].alt}
              width={475}
              height={450}
            />
          </div>
        </Bento>

        <Bento key={bentoImages[6].id}>
          <div>
            <Image
              className={styles.imageStyle}
              src={bentoImages[6].url}
              alt={bentoImages[6].alt}
              width={575}
              height={750}
            />
          </div>
        </Bento>

        <Bento key={bentoImages[7].id}>
          <div>
            <Image
              className={styles.imageStyle}
              src={bentoImages[7].url}
              alt={bentoImages[7].alt}
              width={575}
              height={750}
            />
          </div>
        </Bento>
      </div>
    </div>
  );
}
