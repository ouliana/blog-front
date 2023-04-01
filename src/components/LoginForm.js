import { useState } from 'react';

export default function LoginForm({ loginUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form onSubmit={onSubmit}>
      <div>
        username
        <input
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          data-test='username'
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          name='Password'
          data-test='password'
        />
      </div>
      <button
        type='submit'
        data-test='signin'
      >
        sign in
      </button>
    </form>
  );

  function onSubmit(event) {
    event.preventDefault();
    loginUser({ username, password });
    setUsername('');
    setPassword('');
  }
}
