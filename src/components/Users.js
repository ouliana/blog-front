import { useQuery } from 'react-query';
import axios from 'axios';
const baseUrl = '/api/users';

function Users() {
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

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
