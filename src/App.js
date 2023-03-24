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
    } catch (error) {
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
    blogService.create(blog).then(response => {
      const userInfo = {
        id: response.user,
        name: user.name,
        username: user.username,
      };
      setBlogs([...blogs, { ...response, user: userInfo }]);
      setMessage({
        body: `A blog ${blog.title} by ${blog.author} added`,
        type: 'success',
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
  };

  const handleLikesUpdate = async blog => {
    await blogService.update(blog);

    const byMostLikes = (a, b) => b.likes - a.likes;
    const updateBlogLikes = b =>
      b.id === blog.id ? { ...b, likes: blog.likes } : b;

    setBlogs(blogs.map(updateBlogLikes).sort(byMostLikes));
  };

  const handleRemoveBlog = async id => {
    await blogService.destroy(id);

    const removeDestroyed = blog => blog.id !== id;
    setBlogs(blogs.filter(removeDestroyed));
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
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then(fetchedBlogs => {
      const compareFn = (a, b) => b.likes - a.likes;
      setBlogs(fetchedBlogs.sort(compareFn));
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
            handleLikesUpdate={handleLikesUpdate}
            usersOwnBlog={user.username === blog.user.username}
            handleRemove={handleRemoveBlog}
          />
        ))}
      </div>
    </>
  );
}

export default App;
