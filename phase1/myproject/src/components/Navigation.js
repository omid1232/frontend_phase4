import React from "react";
import "./Navigation.css";
import LogoutButton from "../components/LogoutButton";

const Navigation = ({ links }) => {
  return (
    <nav className="sidebar">
    {/* Optional top section (brand/logo/avatar) */}
      <div className="sidebar-top">
        {/* You can place a logo, username, or an avatar here */}
        <h2 className="brand">Quiz</h2>
      </div>

      {/* Navigation Links */}
      <div className="sidebar-links">
        {links.map((link, index) => (
          <a key={index} href={link.href} className="sidebar-link">
            {link.text}
          </a>
        ))}
      </div>

      {/* Bottom section for logout */}
      <div className="sidebar-bottom">
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navigation;
