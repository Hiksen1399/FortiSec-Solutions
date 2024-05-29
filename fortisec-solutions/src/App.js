import React from 'react';
import './styles/App.css';
import './styles/index.css'; // Asegúrate de importar también los estilos globales
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <div className="video-background">
        <video autoPlay loop muted>
          <source src="/assets/videos/background-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="content">
        <Header />
        <main>
          <Home />
          <AboutUs />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
