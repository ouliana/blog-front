import React, { useEffect, useContext } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from './components/Login';
import Notification from './components/Notification';
import { useNotificationDispatch } from './contexts/NotificationContext';

import Navigation from './components/Navigation';

import userContext from './contexts/UserContext';
import Users from './components/Users';
import User from './components/User';

import blogService from './services/blogs';
import BlogList from './components/BlogList';
import Blog from './components/Blog';

import { ThemeContextProvider } from './contexts/ThemeContext';
import GlobalStyle from './components/GlobalStyle';

export default function App() {
  const dispatchNotification = useNotificationDispatch();
  const [user, userDispatch] = useContext(userContext);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const storedUser = JSON.parse(loggedUserJSON);
      userDispatch({ type: 'SIGNEDIN', payload: storedUser });
      blogService.setToken(storedUser.token);
    }
  }, []);

  return (
    <ThemeContextProvider>
      <GlobalStyle />
      <Notification />
      <Router>
        <Navigation />
        <h1>Blog app</h1>
        <Routes>
          <Route
            path='/'
            element={
              user ? (
                <BlogList
                  user={user}
                  handleNotification={handleNotification}
                />
              ) : (
                <Navigate
                  replace
                  to='/login'
                />
              )
            }
          />
          <Route
            path='/login'
            element={
              user ? (
                <Navigate
                  replace
                  to='/'
                />
              ) : (
                <Login handleNotification={handleNotification} />
              )
            }
          />
          <Route
            path='/blogs/:id'
            element={
              <Blog
                user={user}
                handleNotification={handleNotification}
              />
            }
          />
          <Route
            path='/users'
            element={<Users />}
          />
          <Route
            path='/users/:id'
            element={<User />}
          />
        </Routes>
      </Router>
    </ThemeContextProvider>
  );

  // implementation

  function handleNotification(type, payload) {
    dispatchNotification({ type, payload });
    setTimeout(() => {
      dispatchNotification({ type: 'CLEAR' });
    }, 5000);
  }
}
