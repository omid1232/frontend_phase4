import React from 'react';
import './Header.css';

const Header = ({ title }) => {
  return (
    <header className="header">
      {title}
    </header>
  );
};

export default Header;

