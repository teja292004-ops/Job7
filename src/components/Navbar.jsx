import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <h1>Job Notification Tracker</h1>
      <ul className="nav-links">
        <li>
          <Link to="/" className={isActive('/')}>Dashboard</Link>
        </li>
        <li>
          <Link to="/saved" className={isActive('/saved')}>Saved Jobs</Link>
        </li>
        <li>
          <Link to="/digest" className={isActive('/digest')}>Digest</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
