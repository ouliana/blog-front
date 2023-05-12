import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userContext from '../contexts/UserContext';

import styled from 'styled-components';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//import { faMoon } from '@fortawesome/free-solid-svg-icons';
//import { faSun } from '@fortawesome/free-solid-svg-icons';

import { useThemeValue } from '../contexts/ThemeContext';
import { light, dark } from '../themes';
const themesMap = {
  light,
  dark,
};
// background: ${props => props.theme.colors.background};

const StyledHeader = styled.div`
  background: ${props => props.background};
  color: ${props => props.text};
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f87171;
  padding: 1rem;
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 0.25rem 1rem;
  text-decoration: none;
  transition: color 1s;
  &:hover {
    color: #f87171;
  }
  &:visited {
    color: current;
  }
`;

console.log({
  StyledHeader,
});

const UserBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;
const NavigationBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.div`
  padding: 0.25rem 1rem;
  margin-left: 1rem;
  border-radius: 25px;
  border: 1px solid;
  border-color: ${props => props.border || 'transparent'};
  transition: border-color 1s;
  &:hover {
    border-color: ${props => props.hover || 'transparent'};
    cursor: pointer;
  }
`;

function Navigation() {
  const currentTheme = useThemeValue();
  const theme = { colors: themesMap[currentTheme] };

  const navigate = useNavigate();
  const [user, userDispatch] = useContext(userContext);

  if (!user) return null;

  return (
    <StyledHeader
      background={theme.colors.background}
      text={theme.colors.text}
    >
      <NavigationBlock>
        <StyledLink to='/'>blogs</StyledLink>
        <StyledLink to='/users'>users</StyledLink>
      </NavigationBlock>
      <UserBlock>
        <Button>{user.name}</Button>

        <Button
          onClick={handleLogout}
          data-test='logout'
          border='#f87171'
          hover='#dc2626'
        >
          Log out
        </Button>
      </UserBlock>
    </StyledHeader>
  );

  function handleLogout() {
    window.localStorage.removeItem('loggedBlogappUser');
    userDispatch({ type: 'CLEAR' });
    navigate('/');
  }
}

export default Navigation;
