import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HouseIcon from '@mui/icons-material/House';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { userLogoutAction } from '../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';



const Navbar=() =>{
const dispatch = useDispatch();
const navigate = useNavigate();
const { userInfo } = useSelector(state => state.signIn)

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  const logOutUser= () =>{
    dispatch(userLogoutAction);
    window.location.reload(true);
    setTimeout(()=>{
        navigate('/')
    },500)
  }

  const goToMenu=()=>{
    navigate('/')
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                 <Typography
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block', mr: 2 }}>
                    <Link to="/" style={{ color: 'black', textDecoration: "none" }}>
                        Home
                    </Link>
                </Typography>
                <Typography
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}>
                    <Link to="/login" style={{ color: 'black', textDecoration: "none" }}>
                        Login
                    </Link>
                </Typography>
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* menu desktop */}

                <Typography
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block', mr: 2 }}>
                    <Link to="/" style={{ color: 'white', textDecoration: "none" }}>
                        Home
                    </Link>
                </Typography>

                <Typography
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}>
                    <Link to="/login" style={{ color: 'white', textDecoration: "none" }}>
                        Login
                    </Link>
                </Typography>


            </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography ><Link style={{textDecoration: "none", color: "black"}}to="/admin/dashboard">Admin</Link></Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography ><Link style={{textDecoration: "none", color: "black"}}to="/user/dashboard">User</Link></Typography>
                </MenuItem>

                {
                    userInfo ? 
                    <MenuItem onClick={logOutUser}>
                        <Typography style={{textDecoration: "none", color: "black"}}>Log out</Typography>
                    </MenuItem>
                    :
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography ><Link style={{textDecoration: "none", color: "black"}}to="/login">Login</Link></Typography>
                    </MenuItem>
                }
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar; 