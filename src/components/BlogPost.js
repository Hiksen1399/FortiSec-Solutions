import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/BlogPost.css';

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const apiKey = 'AIzaSyA4mbYO_sgXTViiot3COZlVR_NrvKnsIrQ';
    const blogId = '1124303456571548514';
    const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${id}?key=${apiKey}`;

    axios.get(url)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error("Error fetching the post:", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Comentario: ${comment}, Nombre: ${name}, Correo: ${email}`);
    // Aquí puedes manejar el envío del comentario a tu base de datos o a Blogger.
  };

  return (
    <section id="blog-post">
      {post ? (
        <div>
          <h2>{post.title}</h2>
          <p>Publicado el {new Date(post.published).toLocaleDateString()} por {post.author.displayName}</p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Formulario de comentarios */}
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
        <p>Loading...</p>
      )}
    </section>
  );
}

export default BlogPost;
