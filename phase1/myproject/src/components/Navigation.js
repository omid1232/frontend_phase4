import React from 'react';
import './Navigation.css'; // Menu-specific styles
import LogoutButton from "../components/LogoutButton";

const Navigation = ({ links }) => {
  return (
    <nav className="navigation">
      {links.map((link, index) => (
        <a key={index} href={link.href} className="navigation-link">
          {link.text}
        </a>
      ))}
      <LogoutButton />
    </nav>
  );
};

export default Navigation;