import { useState, useEffect, useRef } from 'react';
import { login } from './services/login';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';

export default function App() {
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const blogFormRef = useRef();

  useEffect(() => {
    var loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      let user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    getBlogsFromDb();

    async function getBlogsFromDb() {
      var fetchedBlogs = await blogService.getAll();
      if (fetchedBlogs) {
        const compareFn = (a, b) => b.likes - a.likes;
        setBlogs(fetchedBlogs.sort(compareFn));
      }
    }
  }, []);

  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={message} />

        <LoginForm loginUser={handleLogin} />
      </div>
    );
  }

  return (
    <>
      <h1>Blogs</h1>
      <Notification message={message} />
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

  // implementation
  async function handleLogin(userObject) {
    try {
      var user = await login(userObject);
      console.log({ user });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
    } catch (error) {
      setMessage({ body: 'Wrong username or password', type: 'error' });
      setTimeout(() => {
        setMessage(null);
      }, 1000);
    }
  }

  function handleLogout() {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  }

  async function crateBlogHandle(blog) {
    var response = await blogService.create(blog);

    blogFormRef.current.toggleVisibility();

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
  }

  async function handleLikesUpdate(blog) {
    await blogService.update(blog);

    const byMostLikes = (a, b) => b.likes - a.likes;
    const mapUpdatedLikes = b =>
      b.id === blog.id ? { ...b, likes: blog.likes } : b;

    setBlogs(blogs.map(mapUpdatedLikes).sort(byMostLikes));
  }

  async function handleRemoveBlog(id) {
    await blogService.destroy(id);

    const removeDestroyed = blog => blog.id !== id;
    setBlogs(blogs.filter(removeDestroyed));
  }

  function blogForm() {
    return (
      <Togglable
        buttonLabel='New blog'
        ref={blogFormRef}
      >
        <BlogForm crateBlogHandle={crateBlogHandle} />
      </Togglable>
    );
  }
}
