import { useState } from 'react';

const BlogForm = ({ crateBlogHandle }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    crateBlogHandle({ title, author, url }).then(() => {
      setTimeout(() => {
        setTitle('');
        setAuthor('');
        setUrl('');
      }, 500);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button tape='submit'>Create</button>
      </form>
    </>
  );
};

export default BlogForm;
