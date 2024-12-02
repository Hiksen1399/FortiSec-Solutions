import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <img src="/assets/images/Logo-FortiSec-Solutions.png" alt="FortiSec - Solutions" className="logo" />
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/about-us">Nosotros</Link></li>
          <li><Link to="/services">Servicios</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contacto</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;


