import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userContext from '../contexts/UserContext';

import styled from 'styled-components';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//import { faMoon } from '@fortawesome/free-solid-svg-icons';
//import { faSun } from '@fortawesome/free-solid-svg-icons';

import { useThemeValue } from '../contexts/ThemeContext';
import { base, light, dark } from '../themes';
const themesMap = {
  light,
  dark,
};
// background: ${props => props.theme.colors.background};

const StyledHeader = styled.div.attrs(({ theme }) => ({
  background: theme.colors.nav,
}))`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #fcd34d;
  padding: 1rem;
  color: Ghostwhite;
`;

const StyledLink = styled(Link)`
  color: Ghostwhite;
  text-decoration: none;
  transition: color 1s;
  &:hover {
    color: burlywood;
  }
`;

const Button = styled.div`
  font-size: 1rem;
  margin: 1rem;
  padding: 0.25rem 1rem;
  border-radius: 25px;
  font-size: small;

  /* Color the border and text with theme.main */
  color: #fcd34d;
  border: 1px solid #fcd34d;
`;

function Navigation() {
  const currentTheme = useThemeValue();
  const theme = { ...base, colors: themesMap[currentTheme] };

  const navigate = useNavigate();
  const [user, userDispatch] = useContext(userContext);

  if (!user) return null;

  return (
    <StyledHeader theme={theme}>
      <div>
        <StyledLink
          theme={theme}
          to='/'
        >
          blogs
        </StyledLink>
        <StyledLink
          theme={theme}
          to='/users'
        >
          users
        </StyledLink>
      </div>
      <div>
        <span>{user.name}</span>

        <Button
          onClick={handleLogout}
          data-test='logout'
        >
          Log out
        </Button>
      </div>
    </StyledHeader>
  );

  function handleLogout() {
    window.localStorage.removeItem('loggedBlogappUser');
    userDispatch({ type: 'CLEAR' });
    navigate('/');
  }
}

export default Navigation;
