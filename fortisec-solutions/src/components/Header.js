import React from 'react';

function Header() {
  return (
    <header>
      <img src="/assets/images/Logo-FortiSec-Solutions.png" alt="FortiSec - Solutions" className="logo" />
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about-us">About Us</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

