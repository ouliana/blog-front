import { useState, useEffect } from 'react';

import Notification from './components/Notification';
import { useNotificationDispatch } from './NotificationContext';

import LoginForm from './components/LoginForm';
import { login } from './services/login';

import blogService from './services/blogs';
import BlogList from './components/BlogList';

export default function App() {
  const dispatch = useNotificationDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    var loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      let user = JSON.parse(loggedUserJSON);
      setUser(user);
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
          dispatchNotification={dispatchNotification}
        />
      </div>
    </>
  );

  // implementation

  async function handleLogin(userObject) {
    try {
      var user = await login(userObject);

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);

      dispatchNotification('USERSIGNEDIN', user);
    } catch (error) {
      dispatchNotification('AUTHERROR', null);
    }
  }

  function handleLogout() {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  }

  function dispatchNotification(type, payload) {
    dispatch({ type, payload });
    setTimeout(() => {
      dispatch({ type: 'CLEAR' });
    }, 5000);
  }
}
