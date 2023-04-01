import { useState } from 'react';

export default function Blog(props) {
  var { blog, handleLikesUpdate, usersOwnBlog, handleRemove } = props;
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [toShow, setToShow] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  var showWhenToShow = { display: toShow ? '' : 'none' };
  var showWhenOwnBlog = { display: usersOwnBlog ? '' : 'none' };

  var buttonLabel = toShow ? 'hide' : 'view';

  return (
    <div style={blogStyle}>
      <div className='blog'>
        {blog.title} {blog.author}
        <button
          onClick={() => setToShow(!toShow)}
          data-test='toggle-details-visibility'
        >
          {buttonLabel}
        </button>
      </div>
      <div
        style={showWhenToShow}
        className='blogDetails'
      >
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          likes {likes}{' '}
          <button
            onClick={submitLikes}
            data-test='submitLikes'
          >
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <div style={showWhenOwnBlog}>
          <button
            onClick={removeBlog}
            data-test='remove-blog'
          >
            remove
          </button>
        </div>
      </div>
    </div>
  );

  async function submitLikes() {
    var blogToUpdate = {
      ...blog,
      likes: likes + 1,
      user: blog.user.id,
    };

    await handleLikesUpdate(blogToUpdate);
    setLikes(likes + 1);
  }

  function removeBlog() {
    if (!window.confirm(`Remove blog ${blog.title}?`)) return;

    handleRemove(blog.id);
  }
}
