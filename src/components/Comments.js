import { useState } from 'react';
import blogService from '../services/blogs';

function Comments({ blog, user }) {
  const [blogComments, setBlogComments] = useState(blog.comments);
  const [newComment, setNewComment] = useState('');

  return (
    <>
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            value={newComment}
            onChange={({ target }) => setNewComment(target.value)}
          />
        </div>
        <button
          type='submit'
          data-test='save'
        >
          add comment
        </button>
      </form>

      <div>
        {blogComments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </div>
    </>
  );

  function handleSubmit(event) {
    event.preventDefault();

    if (!newComment) return;

    setBlogComments(blogComments.concat(newComment));

    const updatedBlog = {
      ...blog,
      user: user.id,
      comments: blog.comments.concat(newComment),
    };

    blogService.update(updatedBlog);
  }
}

export default Comments;
