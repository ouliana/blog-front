import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import blogService from '../services/blogs';
import axios from 'axios';
import Comments from './Comments';

const baseUrl = '/api/blogs';

export default function Blog({ user }) {
  const id = useParams().id;
  const navigate = useNavigate();

  var blog = null;
  const [likes, setLikes] = useState(0);

  const result = useQuery('blog', async () => {
    try {
      const response = await axios.get(`${baseUrl}/${id}`);
      setLikes(response.data.likes);
      return response.data;
    } catch (error) {
      throw new Error('Cannot fetch data');
    }
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  blog = result.data;

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

        <Comments
          blog={blog}
          user={user}
        />

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
