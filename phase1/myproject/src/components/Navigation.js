import React from 'react';
import './Navigation.css'; // Menu-specific styles

const Navigation = ({ links }) => {
  return (
    <nav className="navigation">
      {links.map((link, index) => (
        <a key={index} href={link.href} className="navigation-link">
          {link.text}
        </a>
      ))}
    </nav>
  );
};

export default Navigation;