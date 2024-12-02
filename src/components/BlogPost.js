import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/BlogPost.css';

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const apiKey = 'AIzaSyA4mbYO_sgXTViiot3COZlVR_NrvKnsIrQ';
    const blogId = '1124303456571548514';
    const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${id}?key=${apiKey}`;

    axios.get(url)
      .then(response => setPost(response.data))
      .catch(error => console.error("Error fetching the post:", error));
  }, [id]);

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
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </section>
  );
}

export default BlogPost;
