import React, { useEffect } from 'react';
import '../styles/Services.css';

function Services() {
  useEffect(() => {
    const handleScroll = () => {
      const serviceCards = document.querySelectorAll('.service-card');
      const screenPosition = window.innerHeight;

      serviceCards.forEach((card) => {
        const sectionPosition = card.getBoundingClientRect().top;
        if (sectionPosition < screenPosition) {
          card.classList.add('scroll-activated');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="services" className="services-section">
      <h2>Nuestros Servicios</h2>
      <div className="services-cards">
        <div className="service-card">
          <h3>Auditoría de Seguridad Informática:</h3>
          <p>Realizamos auditorías para detectar vulnerabilidades en sistemas y redes, ofreciendo recomendaciones para mejorar la seguridad, cumpliendo con la Ley 1581 de Protección de Datos Personales.</p>
          <div className="service-icon">
            <img src="./assets/icons/security-audit.png" alt="Auditoría" />
          </div>
        </div>
        <div className="service-card">
          <h3>Consultoría en Ciberseguridad:</h3>
          <p>Ofrecemos asesoramiento especializado para fortalecer la ciberseguridad de tu empresa, protegiendo tus datos y acompañándote en la implementación de medidas según estándares internacionales y locales.</p>
          <div className="service-icon">
            <img src="./assets/icons/cyber-consult.png" alt="Consultoría" />
          </div>
        </div>
        <div className="service-card">
          <h3>Peritaje Informático y Análisis Forense:</h3>
          <p>Ofrecemos servicios de investigación digital para fraude, robo de información o disputas legales, generando informes válidos en procesos judiciales en Colombia. Utilizamos herramientas avanzadas para analizar evidencia y recuperar datos.</p>
          <div className="service-icon">
            <img src="./assets/icons/forensic-analysis.png" alt="Peritaje" />
          </div>
        </div>
        <div className="service-card">
          <h3>Implementación de Soluciones de Seguridad:</h3>
          <p>Te ayudamos a diseñar e implementar soluciones personalizadas como firewalls, sistemas de detección de intrusiones, encriptación de datos y otros elementos clave para proteger tu infraestructura digital.</p>
          <div className="service-icon">
            <img src="./assets/icons/security-solutions.png" alt="Soluciones" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
