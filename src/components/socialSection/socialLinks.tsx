'use client';

import { IconContext } from 'react-icons';
import { SocialLinkData } from './socialSection';

interface SocialLinksProps {
  links: SocialLinkData[];
  iconContextValue: IconContext;
  className: string;
}

const SocialLinks = ({
  links,
  iconContextValue,
  className,
}: SocialLinksProps) => {
  return (
    <IconContext.Provider value={iconContextValue}>
      <ul className={className}>
        {links.map((link) => (
          <li key={link.id}>
            <a href={link.link} target='_blank' rel='noopener noreferrer'>
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
    </IconContext.Provider>
  );
};

export default SocialLinks;
