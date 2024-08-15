import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <img src="/assets/images/Logo-FortiSec-Solutions.png" alt="FortiSec - Solutions" className="logo" />
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;


