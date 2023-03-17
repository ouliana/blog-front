const LoginForm = props => {
  const {
    username,
    password,
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
  } = props;
  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            onChange={handleUsernameChange}
            name='Username'
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
            name='Password'
          />
        </div>
        <button
          type='submit'
          onClick={handleLogin}
        >
          login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
