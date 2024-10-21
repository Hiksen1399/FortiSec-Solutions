import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Blog.css';

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Reemplaza 'YOUR_BLOGGER_API_KEY' y 'BLOGGER_ID' con tu clave y ID del blog
    const apiKey = 'AIzaSyA4mbYO_sgXTViiot3COZlVR_NrvKnsIrQ';
    const blogId = '8088401065820944614';
    const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`;

    axios.get(url)
      .then(response => {
        if (response.data.items) {
          setPosts(response.data.items);
        } else {
          console.error("No posts found");
        }
      })
      .catch(error => {
        console.error("Error fetching blog posts: ", error);
      });
  }, []);

  return (
    <section id="blog">
      <h2>Blog</h2>
      <div className="blog-posts">
        {posts.length ? posts.map(post => (
          <div key={post.id} className="blog-post">
            <h3>{post.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        )) : <p>Loading...</p>}
      </div>
    </section>
  );
}

export default Blog;
