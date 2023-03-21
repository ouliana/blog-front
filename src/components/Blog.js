import { useState } from 'react';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [toShow, setToShow] = useState(false);

  const showWhenToShow = { display: toShow ? '' : 'none' };

  const buttonLabel = toShow ? 'hide' : 'view';

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setToShow(!toShow)}>{buttonLabel}</button>
      </div>
      <div style={showWhenToShow}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button>likes</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  );
};

export default Blog;
