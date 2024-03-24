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
import { theme } from '../App.js';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/Signup.css';
import { signupUser, loginUser } from '../api/users';

function Signup(props) {
  // signup page
  const {
    setLogin, setUsername, setPassword, username, password, login, logout
  } = props;

  const navigate = useNavigate();

  if (login) {
    navigate('/');
  }

  const createUser = async (userObject) => {
    try {
      const response = await signupUser(userObject);
      if (response.data === 'username taken' || response.data === 'error occurred') {
        alert(`${response.data}`);
        setLogin(false);
      } else {
        const responseToken = await loginUser(userObject);
        if (responseToken) {
          sessionStorage.setItem('app-token', responseToken);
          sessionStorage.setItem('username', userObject.username);
          setLogin(true);
        }
      }
    } catch (err) {
      console.log(err);
      alert('user signup failed');
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
                Signup
              </Typography>
              <Box component="form" noValidate onSubmit={createUser} sx={{ mt: 1 }}>
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
                      createUser({ username, password });
                      //const form = document.getElementById('add');
                      //form.reset();
                    }}
                    sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link 
                      to="/signup" 
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/login", { replace: true });
                      }} 
                      variant="body2">
                      {"Already have an account? Login!"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    // <div>
    //   <Navbar setLogin={setLogin} login={login} setUsername={setUsername} username={sessionStorage.getItem('username')} logout = {logout} />
    //   <div className="form-container">
    //     <form id="add" className="mx-auto" style={{ width: '800px' }}>
    //       <h2>Create your profile</h2>
    //       <div className="form-group">
    //         <label htmlFor="Username">
    //           <input size="40" type="text" placeholder="Username" className="form-control" id="Username" onChange={(e) => setUsername(e.target.value)} />
    //         </label>
    //         <br />
    //       </div>
    //       <div className="form-group">
    //         <label htmlFor="Password">
    //           <input size="40" type="text" placeholder="Password" className="form-control" id="Password" onChange={(e) => setPassword(e.target.value)} />
    //         </label>
    //         <br />
    //       </div>
    //       <button
    //         class="button big-btn"
    //         data-testid="button"
    //         onClick={(e) => {
    //           e.preventDefault();
    //           createUser({ username, password });
    //           const form = document.getElementById('add');
    //           form.reset();
    //         }}
    //         type="submit"
    //       >
    //         CREATE ACCOUNT
    //       </button>
    //       <br />
    //       <p>
    //         {'Already have an account? '}
    //         <Link to="/login">Log in here!</Link>
    //       </p>
    //     </form>
    //   </div>
    // </div>
  );
}

export default Signup;