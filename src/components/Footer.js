import React from 'react';
import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <>
      {/* Nuevo footer */}
      <div className="new-footer">
        <div className="new-footer-content">
          <div className="new-footer-social-icons">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="mailto:info@mywebsite.com"><FaEnvelope /></a>
          </div>
          <div className="new-footer-text">
            <h3>¡MANTENTE AL DÍA DE NUEVAS NOTICIAS!</h3>
            <form className="new-footer-form">
              <input type="email" placeholder="Introduce tu correo electronico!" />
              <button type="submit">Suscribirme</button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer existente */}
      <footer>
        <p>&copy; 2024 My Website</p>
        <p>Follow us on <a href="https://web.whatsapp.com">Social Media</a></p>
      </footer>
    </>
  );
}

export default Footer;

