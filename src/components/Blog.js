import { useState } from 'react';

const Blog = props => {
  const { blog, handleLikesUpdate, usersOwnBlog, handleRemove } = props;
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [toShow, setToShow] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const showWhenToShow = { display: toShow ? '' : 'none' };
  const showWhenOwnBlog = { display: usersOwnBlog ? '' : 'none' };

  const buttonLabel = toShow ? 'hide' : 'view';

  const submitLikes = async () => {
    const blogToUpdate = {
      ...blog,
      likes: likes + 1,
      user: blog.user.id,
    };

    await handleLikesUpdate(blogToUpdate);
    setLikes(likes + 1);
  };

  const removeBlog = () => {
    if (!window.confirm(`Remove blog ${blog.title}?`)) return;

    handleRemove(blog.id);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setToShow(!toShow)}>{buttonLabel}</button>
      </div>
      <div style={showWhenToShow}>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          likes {likes} <button onClick={submitLikes}>likes</button>
        </div>
        <div>{blog.user.name}</div>
        <div style={showWhenOwnBlog}>
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
