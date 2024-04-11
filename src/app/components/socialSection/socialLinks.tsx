import Image from 'next/image';
import { SocialLinkData } from './socialSection';
import styles from './socialSection.module.css';

interface SocialLinksProps {
  links: SocialLinkData[];
}

const SocialLinks = ({ links }: SocialLinksProps) => {
  return (
    <ul className={styles.socialLinks}>
      {links.map((link) => (
        <li key={link.id}>
          <a href={link.link} target='_blank'>
            <Image src={link.imgSrc} alt={link.alt} width={100} height={100} />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
