import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './services/login';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Blog from './components/Blog';
import Notification from './components/Notification';
import {
  displaySuccess,
  displayError,
  clear,
} from './reducers/notificationReducer';
import BlogForm from './components/BlogForm';

export default function App() {
  const dispatch = useDispatch();

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
      dispatch(displaySuccess(`${user.name} logged in`));
      setTimeout(() => dispatch(clear()), 3000);

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
    } catch (error) {
      dispatch(displayError('Wrong username or password'));
      setTimeout(() => dispatch(clear()), 3000);

      // dispatchEvent();
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

    dispatch(displaySuccess(`A blog ${blog.title} by ${blog.author} added`));
    setTimeout(() => dispatch(clear()), 3000);
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
