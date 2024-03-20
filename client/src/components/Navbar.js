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
import { styled } from '@mui/system';
import PaidIcon from '@mui/icons-material/Paid';

const pages = ['Learn', 'Leaderboards', 'Achievements'];
const settings = ['Profile'];

const NavbarText = styled(Typography)({
    fontFamily: 'Josefin Sans, sans-serif',
    fontWeight: 1000,
    fontSize: '1.35rem',
});

const NavbarButton = styled(Button)({
    fontFamily: 'Nunito, sans-serif',
    fontWeight: 900,
    fontSize: '1.1rem',
});

function ResponsiveAppBar(props) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const {
        login, setUsername, setLogin, logout
    } = props;
    const loggedIn = login;

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
        setUsername('');
        setLogin(false);
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('app-token');
    };

    const getUsername = () => {
        return sessionStorage.getItem('username') || ''; // Fetch username from sessionStorage
    };

    return (
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
                    style={{ display: loggedIn ? 'inherit' : 'none' }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, letterSpacing: 'normal', color: 'black'}}>
                    <PaidIcon sx={{ mr: 2, fontSize: '2.5rem', alignSelf: 'center' }} />
                    <NavbarText
                        variant="h6"
                        component={Link}
                        to="/"
                        color="text.primary"
                        sx={{ alignSelf: 'center', marginTop: '4px'}}
                    >
                        COMMON CENTS
                    </NavbarText>
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {loggedIn && pages.map((page, index) => (
                        <NavbarButton
                            key={index}
                            component={Link}
                            to={index === 0 ? '/' : `/${page.toLowerCase()}`}
                            sx={{ color: 'inherit', mr: 4 }}
                        >
                            {page}
                        </NavbarButton>
                    ))}
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {loggedIn && (
                            <Typography variant="body1" sx={{ mr: 2, fontFamily: 'Nunito, sans-serif', fontWeight: 900 }}>
                                Welcome {getUsername()}!
                            </Typography>
                        )}
                        <Button
                            component={Link}
                            to={loggedIn ? "/" : "/login"}
                            onClick={handleLoginLogout}
                            sx={{
                                color: loggedIn ? 'error.main' : 'success.main',
                                mr: 2,
                                fontFamily: 'Nunito, sans-serif',
                                fontWeight: 900,
                                fontSize: '1.15rem'
                            }}
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
                                <MenuItem key={index} onClick={handleCloseUserMenu} component={Link} to={`/account`}>
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
    );
}

export default ResponsiveAppBar;