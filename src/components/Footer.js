import React, { useState } from 'react';
import axios from 'axios';
import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/subscribe', { email });
      setMessage(response.data.message);
      setEmail(''); // Limpiar el campo de entrada
    } catch (error) {
      setMessage('Error al suscribir el correo electrónico');
    }
  };

  return (
    <>
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
            <form className="new-footer-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Introduce tu correo electrónico!"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Suscribirme</button>
            </form>
            {message && <p>{message}</p>} {/* Mostrar el mensaje de éxito o error */}
          </div>
        </div>
      </div>

      <footer>
        <p>&copy; 2024 My Website</p>
        <p>Follow us on <a href="https://web.whatsapp.com">Social Media</a></p>
      </footer>
    </>
  );
}

export default Footer;


