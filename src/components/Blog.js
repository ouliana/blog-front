import { useState } from 'react';

const Blog = props => {
  const { blog, handleLikesUpdate } = props;

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

  const buttonLabel = toShow ? 'hide' : 'view';

  const submitLikes = async () => {
    const blogToUpdate = {
      ...blog,
      likes: likes + 1,
      user: blog.user.id,
    };

    await handleLikesUpdate(blogToUpdate);
    console.log('afrer await');
    setLikes(likes + 1);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setToShow(!toShow)}>{buttonLabel}</button>
      </div>
      <div style={showWhenToShow}>
        <div>{blog.url}</div>
        <div>
          likes {likes} <button onClick={submitLikes}>likes</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  );
};

export default Blog;
