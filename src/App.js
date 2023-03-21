import { useState, useEffect, useRef } from 'react';
import loginService from './services/login';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';

function App() {
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const blogFormRef = useRef();

  const handleLogin = async userObject => {
    try {
      const user = await loginService.login(userObject);

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
    } catch {
      setMessage({ body: 'Wrong username or password', type: 'error' });
      setTimeout(() => {
        setMessage(null);
      }, 1000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  const crateBlogHandle = async blog => {
    blogService.create(blog, user.token).then(response => {
      setBlogs([...blogs, response]);
      setMessage({
        body: `A blog ${blog.title} by ${blog.author} added`,
        type: 'success',
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
  };

  const blogForm = () => (
    <Togglable
      buttonLabel='new blog'
      ref={blogFormRef}
    >
      <BlogForm crateBlogHandle={crateBlogHandle} />
    </Togglable>
  );

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then(fetchedBlogs => {
      setBlogs(fetchedBlogs);
    });
  }, []);

  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={message} />

        <LoginForm signInUser={handleLogin} />
      </div>
    );
  }

  return (
    <>
      <h1>Blogs</h1>
      <Notification message={message} />
      <div>
        <p className='welcome'>{user.name} logged in</p>
        <button onClick={handleLogout}>Sign out</button>
      </div>

      <div>
        <h2>Blogs</h2>
        {blogForm()}
        {blogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    </>
  );
}

export default App;
