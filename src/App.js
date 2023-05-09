import { useEffect, useContext } from 'react';

import Notification from './components/Notification';
import { useNotificationDispatch } from './NotificationContext';

import LoginForm from './components/LoginForm';
import { login } from './services/login';
import userContext from './UserContext';

import blogService from './services/blogs';
import BlogList from './components/BlogList';

export default function App() {
  const dispatchNotification = useNotificationDispatch();
  const [user, userDispatch] = useContext(userContext);

  useEffect(() => {
    var loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      let user = JSON.parse(loggedUserJSON);
      userDispatch({ type: 'SIGNEDIN', payload: user });
      blogService.setToken(user.token);
    }
  }, []);

  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification />

        <LoginForm loginUser={handleLogin} />
      </div>
    );
  }

  return (
    <>
      <h1>Blogs</h1>
      <Notification />
      <div>
        <p className='welcome'>{user.name} logged in</p>
        <button
          onClick={handleLogout}
          data-test='logout'
        >
          Sign out
        </button>
      </div>

      <div>
        <h2>Blogs</h2>
        <BlogList
          user={user}
          handleNotification={handleNotification}
        />
      </div>
    </>
  );

  // implementation

  async function handleLogin(userObject) {
    try {
      const user = await login(userObject);

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);
      console.log('user:', user);
      userDispatch({ type: 'SIGNEDIN', payload: user });

      handleNotification('USERSIGNEDIN', user);
    } catch (error) {
      handleNotification('AUTHERROR', null);
    }
  }

  function handleLogout() {
    window.localStorage.removeItem('loggedBlogappUser');
    userDispatch({ type: 'CLEAR' });
  }

  function handleNotification(type, payload) {
    dispatchNotification({ type, payload });
    setTimeout(() => {
      dispatchNotification({ type: 'CLEAR' });
    }, 5000);
  }
}
