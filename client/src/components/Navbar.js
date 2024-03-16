// import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../styles/Navbar.css';
import axios from 'axios';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../App';

const pages = ['Learn', 'Leaderboards', 'Achievements'];
const settings = ['Profile', 'Account'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false); // Assuming initially the user is not logged in

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLoginLogout = () => {
        // Toggle login state
        setLoggedIn(!loggedIn);
    };

    const getUsername = () => {
        return sessionStorage.getItem('username') || ''; // Fetch username from sessionStorage
    };

    return (
        // <ThemeProvider theme={theme}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{ flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem' }}
                >
                    COMMON CENTS
                </Typography>

                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page, index) => (
                        <Button
                            key={index}
                            component={Link}
                            to={index === 0 ? '/' : `/${page.toLowerCase()}`}
                            sx={{ color: 'inherit', mr: 1 }}
                        >
                            {page}
                        </Button>
                    ))}
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {loggedIn && (
                            <Typography variant="body1" sx={{ mr: 2 }}>
                                Welcome {getUsername()}
                            </Typography>
                        )}
                        <Button
                            component={Link}
                            to={loggedIn ? "/logout" : "/login"}
                            onClick={handleLoginLogout}
                            sx={{ color: 'inherit', mr: 2 }}
                        >
                            {loggedIn ? "Logout" : "Login"}
                        </Button>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting, index) => (
                                <MenuItem key={index} onClick={handleCloseUserMenu} component={Link} to={`/${setting.toLowerCase()}`}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Box>
            </Toolbar>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
            >
                {pages.map((page, index) => (
                    <MenuItem key={index} onClick={handleCloseNavMenu} component={Link} to={index === 0 ? '/' : `/${page.toLowerCase()}`}>
                        <Typography variant="inherit">{page}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </AppBar>
        /*</ThemeProvider>*/
    );
}

export default ResponsiveAppBar;

/*
function Navbar(props) {
  const navigate = useNavigate();

//   const username = useContext(UserContext);
const {
  login, setUsername, setLogin, logout
} = props;
const loggedIn = login;
// const streak = 2;
// const points = 300;

  const clickedHome = () => {
    navigate('/');
  };

  const clickedSignup = () => {
    navigate('/signup');
  };

  const clickedLogin = () => {
    navigate('/login');
  };

  const clickedLeaderboards = () => {
    navigate('/leaderboards');
  };

  const clickedAchievements = () => {
    navigate('/achievements');
  };

  const clickedAdminConsole = () => {
    navigate('/admin-console');
  };



  const clickedProfile = () => {
    navigate(`/profile/${sessionStorage.getItem('username')}`);
  };

  // const clickedLogout = async () => {
  //   await axios.post('http://localhost:3000/account/logout');
  //   setUsername('');
  //   setLogin(false);
  // };

  return (
    <><div className="Navbar">
          <div className="feature" />
          <button className="textbutton" type="button" onClick={clickedHome}>
              {'Common Cents'}
          </button>
          <button className="textbutton" type="button" onClick={clickedLeaderboards}>
              {'Leaderboards'}
          </button>
          <button className="textbutton" type="button" onClick={clickedAchievements}>
              {'Achievements'}
          </button>
          <button className="textbutton" type="button" onClick={clickedAdminConsole}>
            {'Admin Console'}
          </button>
          <button className="textbutton" type="button" onClick={clickedProfile}>
              {'Profile'}
          </button>
          {loggedIn ? <div className="profile">
                <div>
                    {/!* <span className="user">Points: {points}</span>
                    <span className="user">Streak: {streak}</span> *!/}
                    <span className="user">{sessionStorage.getItem('username')}</span>
                </div>
                <button className="textbutton" type="button" onClick={() => logout()}>
                    {'Logout'}
                </button>
            </div>
                : <div className="profile">
                    <button className="textbutton" type="button" onClick={clickedSignup}>
                        {'Signup'}
                    </button>
                    <button className="textbutton" type="button" onClick={clickedLogin}>
                        {'Login'}
                    </button></div>}
        </div>
        </>
  );
}

export default Navbar;*/
