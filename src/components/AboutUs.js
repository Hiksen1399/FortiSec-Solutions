import React, { useEffect, useState } from 'react';
import '../styles/AboutUs.css';

function AboutUs() {
  const [displayText, setDisplayText] = useState('');
  const text = 'En Fortisec Solutions, somos líderes en el campo de la ciberseguridad y el peritaje informático. Nuestra misión es proteger tu información más valiosa y ofrecerte soluciones personalizadas para enfrentar cualquier desafío digital.';

  useEffect(() => {
    let index = 0;
    const typingEffect = () => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text[index]);
        index++;
        setTimeout(typingEffect, 50); // Velocidad de la escritura
      }
    };
    typingEffect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('.cards-section');
      const sectionPosition = section.getBoundingClientRect().top;
      const screenPosition = window.innerHeight;

      if (sectionPosition < screenPosition) {
        section.classList.add('scroll-activated');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="about-us-section">
      <h2>¿Quiénes Somos?</h2>
      <p className="about-us-text">{displayText}</p>

      {/* Nueva sección de compromiso */}
      <div className="commitment-section-2">
        <p>Nuestra Misión y Visión</p>
      </div>

      {/* Nueva sección de tarjetas */}
      <div className="cards-section">
        <div className="card">
          <h3>Misión</h3>
          <p>Proporcionar servicios de ciberseguridad de la más alta calidad para asegurar la protección de datos de nuestros clientes.</p>
          <div className="image-container">
            <img src="./assets/images/mision.png" alt="Misión" />
          </div>
        </div>
        <div className="card">
          <h3>Visión</h3>
          <p>Ser reconocidos como la empresa líder en seguridad de la información, innovando continuamente para enfrentar nuevas amenazas digitales.</p>
          <div className="image-container">
            <img src="./assets/images/vision.png" alt="Visión" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
