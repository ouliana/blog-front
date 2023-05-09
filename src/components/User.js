import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const baseUrl = '/api/users';

const generateKey = () => Math.floor(Math.floor(Math.random() * 10000));

function User() {
  const result = useQuery('users', async () => {
    try {
      const response = await axios.get(baseUrl);
      return response.data;
    } catch (error) {
      throw new Error('Cannot fetch data');
    }
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const users = result.data;

  const id = useParams().id;
  console.log({ id });
  const user = users.find(n => n.id === id);

  return (
    <div>
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.map(blog => (
          <li key={generateKey()}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default User;
