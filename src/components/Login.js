import { useNavigate } from 'react-router-dom';

import LoginForm from './LoginForm';
import { useUserDispatch } from '../UserContext';

import { login } from '../services/login';
import blogService from '../services/blogs';

function Login({ handleNotification }) {
  const navigate = useNavigate();
  const dispatch = useUserDispatch();

  return <LoginForm loginUser={handleLogin} />;

  async function handleLogin(userObject) {
    try {
      const user = await login(userObject);

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);
      dispatch({ type: 'SIGNEDIN', payload: user });
      navigate('/');

      handleNotification('USERSIGNEDIN', user);
    } catch (error) {
      handleNotification('AUTHERROR', null);
    }
  }
}

export default Login;
