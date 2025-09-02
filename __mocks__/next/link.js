import React from 'react';

const Link = ({ children, href, ...props }) => {
  return <a href={href} {...props}>{children}</a>;
};

export default Link;
