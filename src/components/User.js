import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
const baseUrl = '/api/users';

const generateKey = () => Math.floor(Math.floor(Math.random() * 10000));

function User() {
  const id = useParams().id;
  const result = useQuery('user', async () => {
    try {
      const response = await axios.get(`${baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Cannot fetch data');
    }
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const user = result.data;
  if (!user) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={generateKey()}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default User;
