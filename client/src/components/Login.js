import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import {loginUser} from "../api/users";
import { theme } from '../App.js';
import Navbar from './Navbar';

export default function Login(props) {
  const {
    setLogin, login, setUsername, setPassword, username, password, logout
  } = props;

  const navigate = useNavigate();

  if (login) {
    navigate('/');
  }

  const loginUserOnClick = async (userObject) => {
    try {
      const responseToken = await loginUser(userObject);
      if (responseToken) {
        sessionStorage.setItem('app-token', responseToken);
        sessionStorage.setItem('username', userObject.username);
        setLogin(true);
      } else {
        alert('Incorrect username or password');
      }
    } catch (err) {
      console.log(err);
      alert('User authentication failed');
    }
  };

  return (
      <ThemeProvider theme={theme}>
          <Navbar setLogin={setLogin} login={login} setUsername={setUsername} username={username} logout={logout}/>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In
              </Typography>
              <Box component="form" noValidate onSubmit={loginUserOnClick} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Username"
                    label="Username"
                    name="email"
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={(e) => {
                      e.preventDefault();
                      loginUserOnClick({ username, password });
                      //const form = document.getElementById('add');
                      //form.reset();
                    }}
                    sx={{ mt: 3, mb: 5 }}
                >
                  Sign In
                </Button>
                  <Grid container justifyContent="center">
                      <Grid item>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                              {"Don't have an account? "}
                              <Button
                                  to="/signup"
                                  type="submit"
                                  fullWidth
                                  variant="contained"
                                  color="info"
                                  onClick={(e) => {
                                      e.preventDefault();
                                      navigate("/signup", { replace: true });
                                  }}
                                  sx={{ mt: 2, mb: 2 }}
                              >
                                  Sign Up
                              </Button>
                          </Typography>
                      </Grid>
                  </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
  );
}