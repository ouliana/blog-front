import { useState } from 'react';

export default function BlogForm({ crateBlogHandle }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder='title'
            data-test='input-title'
          />
        </div>
        <div>
          Author
          <input
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='author'
            data-test='input-author'
          />
        </div>
        <div>
          url
          <input
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder='url'
            data-test='input-url'
          />
        </div>
        <button
          type='submit'
          data-test='save'
        >
          save
        </button>
      </form>
    </>
  );

  async function handleSubmit(event) {
    event.preventDefault();

    await crateBlogHandle({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  }
}
