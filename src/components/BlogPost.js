import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/BlogPost.css';

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const apiKey = 'AIzaSyA4mbYO_sgXTViiot3COZlVR_NrvKnsIrQ';
    const blogId = '1124303456571548514';
    const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${id}?key=${apiKey}`;

    axios.get(url)
      .then(response => setPost(response.data))
      .catch(error => console.error("Error fetching the post:", error));

    fetchComments(); // Llamamos a fetchComments al cargar el componente
  }, [id]);

  const fetchComments = () => {
    // Aquí puedes implementar la lógica para obtener los comentarios desde la API de Blogger o cualquier fuente de datos.
    setComments([
      { id: 1, name: "Usuario1", text: "Comentario de ejemplo 1" },
      { id: 2, name: "Usuario2", text: "Comentario de ejemplo 2" }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simular la adición del comentario al frontend inmediatamente
    const newComment = {
      id: comments.length + 1,
      name,
      text: comment
    };
    setComments([...comments, newComment]);

    // Resetear los campos del formulario
    setComment('');
    setName('');
    setEmail('');

    // Aquí se puede implementar lógica adicional para conectar con un servidor intermediario si se desea almacenar el comentario de manera persistente
    console.log(`Comentario: ${comment}, Nombre: ${name}, Correo: ${email}`);
  };

  return (
    <section id="blog-post">
      <nav className="breadcrumb">
        <Link to="/blog">Blog</Link> <span>{'>'}</span> <span>{post ? post.title : 'Cargando...'}</span>
      </nav>

      {post ? (
        <div>
          <h2>{post.title}</h2>
          <p className="post-info">
            Publicado el {new Date(post.published).toLocaleDateString()} por {post.author.displayName}
          </p>
          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />

          <div className="existing-comments">
            <h3>Comentarios</h3>
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <p><strong>{comment.name}:</strong> {comment.text}</p>
                <button>Me gusta</button>
              </div>
            ))}
          </div>

          <div className="comments-section">
            <h3>Dejanos saber tu Opinión!</h3>
            <form onSubmit={handleSubmit}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comentario*"
                required
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre*"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo*"
                required
              />
              <button type="submit">Publicar</button>
            </form>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </section>
  );
}

export default BlogPost;
