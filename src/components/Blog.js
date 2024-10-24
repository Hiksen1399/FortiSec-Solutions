import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // useLocation se usa para obtener la ruta actual
import axios from 'axios';
import '../styles/Blog.css';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [labels, setLabels] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [filteredPosts, setFilteredPosts] = useState([]); // Estado para los posts filtrados
  const [selectedLabel, setSelectedLabel] = useState(''); // Estado para la etiqueta seleccionada
  const location = useLocation(); // Obtén la ubicación actual

  useEffect(() => {
    const apiKey = 'AIzaSyA4mbYO_sgXTViiot3COZlVR_NrvKnsIrQ';
    const blogId = '1124303456571548514';
    const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`;

    axios.get(url)
      .then(response => {
        if (response.data.items) {
          setPosts(response.data.items);
          setFilteredPosts(response.data.items); // Inicialmente, todos los posts son los filtrados

          // Extraer etiquetas de todos los posts
          const allLabels = response.data.items.reduce((acc, post) => {
            if (post.labels) {
              post.labels.forEach(label => {
                if (!acc.includes(label)) {
                  acc.push(label);
                }
              });
            }
            return acc;
          }, []);
          setLabels(allLabels); // Guardar las etiquetas
        } else {
          console.error("No posts found");
        }
      })
      .catch(error => {
        console.error("Error fetching blog posts: ", error);
      });
  }, []);

  // Función para extraer la primera imagen del contenido HTML de cada post
  const extractFirstImage = (content) => {
    const div = document.createElement('div');
    div.innerHTML = content;
    const img = div.querySelector('img');
    return img ? img.src : 'URL_IMAGEN_POR_DEFECTO'; // Si no hay imagen, usar una por defecto
  };

  // Eliminar etiquetas HTML del contenido del post
  const extractText = (htmlContent) => {
    const div = document.createElement('div');
    div.innerHTML = htmlContent;
    return div.innerText; // Extrae el texto sin etiquetas HTML
  };

  // Función para manejar la búsqueda
  const handleSearch = () => {
    if (searchTerm === '') {
      setFilteredPosts(posts); // Si no hay término de búsqueda, mostrar todos los posts
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  // Función para manejar la selección de una etiqueta
  const handleLabelClick = (label) => {
    const filteredByLabel = posts.filter(post => post.labels && post.labels.includes(label));
    setFilteredPosts(filteredByLabel);
    setSelectedLabel(label); // Guardar la etiqueta seleccionada para el breadcrumb
  };

  // Función para refrescar la página cuando se hace clic en el título de "Blog"
  const handleRefreshBlog = () => {
    setFilteredPosts(posts); // Resetear la lista de posts filtrados
    setSelectedLabel(''); // Resetear la etiqueta seleccionada
  };

  return (
    <section id="blog">
      {/* Breadcrumb solo para la sección de blog */}
      <nav className="breadcrumb">
        <Link to="/blog" onClick={handleRefreshBlog}>Blog</Link>
        {selectedLabel && <span>{'>'} {selectedLabel}</span>}
        {location.pathname !== '/blog' && <span>{'>'} Blog Detalles</span>}
      </nav>

      <div className="blog-content">
        <div className="left-section">
          <h2 onClick={handleRefreshBlog}>Blog</h2>
          {filteredPosts.length ? filteredPosts.map(post => (
            <div key={post.id} className="blog-post">
              <img src={extractFirstImage(post.content)} alt={post.title} className="blog-image" />
              <div className="blog-details">
                {post.labels && (
                  <span className="blog-category">{post.labels.join(', ')}</span>
                )}
                <h3>{post.title}</h3>
                <p>{extractText(post.content).slice(0, 100)}...</p> {/* Se eliminan las etiquetas HTML */}
                <Link to={`/blog/${post.id}`}>Leer más</Link>
              </div>
              <hr className="blog-divider" /> {/* Línea divisoria entre blogs */}
            </div>
          )) : <p>No se encontraron resultados.</p>}
        </div>

        <div className="right-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
            />
            <button onClick={handleSearch}>Buscar</button> {/* Ejecuta la búsqueda */}
          </div>

          {/* Sección de Blogs Recientes */}
          <div className="recent-posts">
            <h3>Reciente</h3>
            <ul>
              {posts.slice(0, 3).map(post => (
                <li key={post.id}>
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sección de Temas */}
          <div className="blog-topics">
            <h3>Temas</h3>
            <ul>
              {labels.length ? labels.map(label => (
                <li key={label} onClick={() => handleLabelClick(label)}> {/* Al hacer clic en la etiqueta */}
                  {label}
                </li>
              )) : <li>No hay temas disponibles</li>}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blog;
