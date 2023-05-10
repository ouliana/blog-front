import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userContext from '../UserContext';

function Navigation() {
  const padding = {
    padding: 10,
  };

  const navigate = useNavigate();
  const [user, userDispatch] = useContext(userContext);

  if (!user) return null;

  return (
    <div>
      <Link
        style={padding}
        to='/'
      >
        blogs
      </Link>
      <Link
        style={padding}
        to='/users'
      >
        users
      </Link>
      <span>{user.name} logged in</span>
      <button
        onClick={handleLogout}
        data-test='logout'
      >
        Sign out
      </button>
    </div>
  );

  function handleLogout() {
    window.localStorage.removeItem('loggedBlogappUser');
    userDispatch({ type: 'CLEAR' });
    navigate('/');
  }
}

export default Navigation;
