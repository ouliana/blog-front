import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import blogService from '../services/blogs';
import axios from 'axios';
const baseUrl = '/api/blogs';

export default function Blog({ user }) {
  const id = useParams().id;
  const navigate = useNavigate();

  var blog = null;

  const result = useQuery('blog', async () => {
    try {
      const response = await axios.get(`${baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Cannot fetch data');
    }
  });
  const [likes, setLikes] = useState(result.isLoading ? 0 : result.data.likes);

  useEffect(() => {
    if (blog) {
      setLikes(blog.likes);
    }
  }, [blog]);

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  blog = result.data;

  if (!blog) return null;

  return (
    <>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          likes {likes}{' '}
          <button
            onClick={submitLikes}
            data-test='submitLikes'
          >
            like
          </button>
        </div>
        <div>added by {blog.user.name}</div>
        {user.id === blog.user.id && (
          <button onClick={handleDelete}>delete</button>
        )}
      </div>
    </>
  );

  async function submitLikes() {
    var blogToUpdate = {
      ...blog,
      likes: likes + 1,
      user: blog.user.id,
    };

    await blogService.update(blogToUpdate);
    setLikes(likes + 1);
  }

  async function handleDelete() {
    if (!window.confirm(`Delete blog ${blog.title}?`)) return;

    await blogService.destroy(blog.id);

    navigate('/');
  }
}
