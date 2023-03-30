import { useState } from 'react';

const LoginForm = signInUser => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = event => {
    event.preventDefault();

    signInUser({ username, password });
    setUsername('');
    setPassword('');
  };
  return (
    <>
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
          data-test='sign in'
        >
          sign in
        </button>
      </form>
    </>
  );
};

export default LoginForm;
