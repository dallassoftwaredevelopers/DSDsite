import { IconContext } from 'react-icons';
import { SocialLinkData } from './socialSection';
import styles from './socialSection.module.css';

interface SocialLinksProps {
  links: SocialLinkData[];
}

const SocialLinks = ({ links }: SocialLinksProps) => {
  return (
    <IconContext.Provider value={{ color: 'black', size: '7rem' }}>
      <ul className={styles.socialLinks}>
        {links.map((link) => (
          <li key={link.id}>
            <a href={link.link} target='_blank'>
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
    </IconContext.Provider>
  );
};

export default SocialLinks;
