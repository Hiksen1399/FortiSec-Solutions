import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Blog.css';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const apiKey = 'AIzaSyA4mbYO_sgXTViiot3COZlVR_NrvKnsIrQ';
    const blogId = '1124303456571548514';
    const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`;

    axios.get(url)
      .then(response => {
        if (response.data.items) {
          setPosts(response.data.items);

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
    return img ? img.src : 'URL_IMAGEN_POR_DEFECTO'; // Si no hay imagen, una imagen por defecto
  };

  return (
    <section id="blog">
      <div className="blog-content">
        <div className="left-section">
          <h2>Blog</h2>
          {posts.length ? posts.map(post => (
            <div key={post.id} className="blog-post">
              <img src={extractFirstImage(post.content)} alt={post.title} className="blog-image" />
              <div className="blog-details">
                {post.labels && (
                  <span className="blog-category">{post.labels.join(', ')}</span> // Muestra las etiquetas
                )}
                <h3>{post.title}</h3>
                <p>{post.content.slice(0, 100)}...</p>
                <Link to={`/blog/${post.id}`}>Leer más</Link>
              </div>
            </div>
          )) : <p>Loading...</p>}
        </div>

        <div className="right-section">
          <div className="search-bar">
            <input type="text" placeholder="Buscar..." />
            <button>Buscar</button>
          </div>
          <div className="recent-posts">
            <h3>Reciente</h3>
            <ul>
              <li>Blog 1...</li>
              <li>Blog 2...</li>
              <li>Blog 3...</li>
            </ul>
          </div>

          {/* Sección de Temas, mostrando etiquetas extraídas */}
          <div className="blog-topics">
            <h3>Temas</h3>
            <ul>
              {labels.map(label => (
                <li key={label}>{label}</li> // Mostrar todas las etiquetas
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blog;
