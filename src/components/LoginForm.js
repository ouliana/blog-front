import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginForm = props => {
  const {
    username,
    password,
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <>
      <h2>Log in to application</h2>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <div>
          <FormControl
            sx={{ m: 1, width: '25ch' }}
            variant='outlined'
          >
            <InputLabel htmlFor='username'>Username</InputLabel>
            <OutlinedInput
              id='username'
              aria-describedby='username'
              inputProps={{
                'aria-label': 'username',
              }}
              value={username}
              onChange={handleUsernameChange}
              label='Username'
            />
          </FormControl>
          <FormControl
            sx={{ m: 1, width: '25ch' }}
            variant='outlined'
          >
            <InputLabel htmlFor='outlined-adornment-password'>
              Password
            </InputLabel>
            <OutlinedInput
              id='password'
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>
        </div>
      </Box>
      <Button
        type='submit'
        variant='contained'
        color='primary'
        onClick={handleLogin}
      >
        Sign in
      </Button>
    </>
  );
};

export default LoginForm;
