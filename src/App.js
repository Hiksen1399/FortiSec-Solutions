import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa las herramientas de enrutamiento
import './styles/App.css';
import './styles/index.css'; // Asegúrate de importar también los estilos globales
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Contact from './components/Contact';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost'; // Importa el componente Blog

function App() {
  return (
    <Router>
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
            <Routes>
              {/* Definición de rutas para cada componente */}
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} /> {/* Ruta para el blog */}
              <Route path="/blog/:id" element={<BlogPost />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
