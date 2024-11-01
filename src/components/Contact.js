import React from 'react';
import { FaEnvelope, FaLinkedin, FaInstagram } from 'react-icons/fa';
import '../styles/Contact.css';

function Contact() {
  return (
    <section id="contact">
      <h2 className="contact-title">Contáctanos</h2>
      <div className="contact-box">
        <p>Si quieres entrar en contacto o saber más de nosotros da click a los siguientes iconos</p>
        <div className="contact-icons">
          <a href="mailto:FortisecSolutions@gmail.com" target="_blank" rel="noopener noreferrer" className="contact-icon">
            <FaEnvelope className="icon" /> FortisecSolutions@gmail.com
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-icon">
            <FaLinkedin className="icon" /> LinkedIn
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="contact-icon">
            <FaInstagram className="icon" /> Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
