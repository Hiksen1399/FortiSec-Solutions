import React, { useEffect } from 'react';
import '../styles/Home.css';

function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const midSection = document.querySelector('.mid-section');
      const cardsSection = document.querySelector('.cards-section');
      
      const midPosition = midSection.getBoundingClientRect().top;
      const cardsPosition = cardsSection.getBoundingClientRect().top;

      if (midPosition < window.innerHeight) {
        midSection.classList.add('scroll-activated');
      }

      if (cardsPosition < window.innerHeight) {
        cardsSection.classList.add('scroll-activated');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="home">
      <div className="content">
        <h2>¿Alguna vez te has cuestionado si tus datos están realmente protegidos?</h2>
        <button>¡Quiero saber más!</button>
      </div>

      {/* Sección del párrafo en el medio */}
      <div className="mid-section">
        <p>
          En Fortisec Solutions, nuestro compromiso es mantener tu información a salvo. Nos especializamos en peritaje informático y ciberseguridad, y estamos dedicados a informarte sobre las mejores prácticas, asesorarte para identificar y mitigar vulnerabilidades, y ayudarte a implementar soluciones robustas para prevenir ciberataques.
        </p>
      </div>

      {/* Nueva sección de compromiso */}
      <div className="commitment-section">
        <p>Nuestro Compromiso: Protección y Asesoría Integral</p>
      </div>

      {/* Nueva sección de tarjetas */}
      <div className="cards-section">
        <div className="card">
          <h3>Informarte</h3>
          <p>Proveemos la información esencial y actualizada sobre las mejores prácticas de seguridad.</p>
          <div className="image-container">
            <img src="ruta/de/tu/imagen1.jpg" alt="Informarte" />
          </div>
        </div>
        <div className="card">
          <h3>Asesorarte</h3>
          <p>Brindamos asesoramiento personalizado para identificar y mitigar vulnerabilidades.</p>
          <div className="image-container">
            <img src="ruta/de/tu/imagen2.jpg" alt="Asesorarte" />
          </div>
        </div>
        <div className="card">
          <h3>Apoyarte</h3>
          <p>Implementamos soluciones robustas para prevenir ciberataques y proteger tu valiosa información.</p>
          <div className="image-container">
            <img src="ruta/de/tu/imagen3.jpg" alt="Apoyarte" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
