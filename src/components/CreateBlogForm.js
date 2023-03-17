import { useState } from 'react';

const CreateBlogForm = ({ crateBlogHandle }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = event => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = event => {
    setUrl(event.target.value);
  };

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
      <form>
        <div>
          title
          <input
            type='text'
            name='title'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author
          <input
            type='text'
            name='author'
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <input
            type='text'
            name='url'
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button
          tape='submit'
          onClick={handleSubmit}
        >
          Create
        </button>
      </form>
    </>
  );
};

export default CreateBlogForm;
