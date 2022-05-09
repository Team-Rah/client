import React, { useState } from 'react';
import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Badge from '@mui/material/Badge';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import FriendsModalForm from '../Modal/FriendsModalForm';
import Skeleton from '@mui/material/Skeleton';
const Navbar = () => {
  const loginClicked = () => {
    handleLoginModal();
  };

  const signupClicked = () => {
    handleSignupModal();
  };

  //navbar page states based on if user is logged in
  const pagesIfLoggedIn = [, 'Ranking', <Link href='/'>Logout</Link>];
  const pagesIfNotLoggedIn = [
    ,
    <div onClick={signupClicked}>Sign Up</div>,
    <div onClick={loginClicked}>Login</div>,
  ];
  //handles hamburger menu
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  //modal states
  const [open, setOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  const handleLoginModal = () => {
    setLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModal(false);
  };

  const handleSignupModal = () => {
    setSignupModal(true);
  };

  const handleCloseSignupModal = () => {
    setSignupModal(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //handling friends states
  //green dot does not appear if invisible is true
  const [invisible, setInvisible] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [friendLoggedIn, setFriendLoggedIn] = useState(false);
  const [state, setState] = useState({
    left: false,
  });
  //toggle skeleton
  const [loading, setLoading] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      {/* //toggle skeleton */}
      {loading && (
        <List>
          {[...Array(20)].map((text) => {
            return (
              <div key={uuidv4()}>
                <ListItem>
                  <ListItemIcon>
                    <Skeleton animation='wave' height={40} width={40} variant='circular' />
                    <Skeleton
                      style={{ marginLeft: '15px', marginTop: '12px' }}
                      animation='wave'
                      width={40}
                      height={20}
                      variant='rectangular'
                    />
                  </ListItemIcon>
                </ListItem>
                <Divider light />
              </div>
            );
          })}
        </List>
      )}

      {!loading && (
        <List>
          {/* array of friends for specific user */}
          {[
            'Josh',
            'Cihad',
            'Tony',
            'David',
            'Lauren',
            'Kyle',
            'Kyle',
            'Kyle',
            'Kyle',
            'Kyle',
            'Kyle',
            'Kyle',
            'Kyle',
            'Kyle',
            'Kyle',
            'Kyle',
          ].map((text, index) => (
            <div key={uuidv4()}>
              <ListItem>
                <ListItemIcon>
                  {/* if user.loggedIn is true, show green, else show invisible */}
                  {friendLoggedIn ? (
                    <Badge overlap='circular' variant='dot' color='success'>
                      <IconButton size='small' onClick={avatarClick}>
                        <Avatar />
                      </IconButton>
                    </Badge>
                  ) : (
                    <IconButton size='small' onClick={avatarClick}>
                      <Avatar />
                    </IconButton>
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
              <Divider light />
            </div>
          ))}
        </List>
      )}
    </Box>
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const friendsClicked = () => {
    handleCloseNavMenu();
    toggleDrawer('right', true)();
  };

  //make it so modal appears to either send message or delete friend
  const avatarClick = (e) => {
    e.stopPropagation();
    handleOpen();
  };

  return (
    <>
      <AppBar position='static' color='primary'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Link href='/'>
              <Typography
                variant='h6'
                noWrap
                component='a'
                href='/'
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}>
                WEREWOLF
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'>
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
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
                }}>
                {/* if user.loggedIn is true, show green, else show invisible */}
                {loggedIn && (
                  <MenuItem onClick={friendsClicked} key='friends'>
                    Friends
                  </MenuItem>
                )}
                {loggedIn
                  ? pagesIfLoggedIn.map((page) => (
                      <MenuItem key={uuidv4()} onClick={handleCloseNavMenu}>
                        {page}
                      </MenuItem>
                    ))
                  : pagesIfNotLoggedIn.map((page) => (
                      <MenuItem key={uuidv4()} onClick={handleCloseNavMenu}>
                        {page}
                      </MenuItem>
                    ))}
              </Menu>
            </Box>
            <Link href='/'>
              <Typography
                variant='h5'
                noWrap
                component='a'
                href=''
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}>
                WEREWOLF
              </Typography>
            </Link>
            <Box
              sx={{
                marginRight: '2em',
                justifyContent: 'flex-end',
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
              }}>
              {loggedIn && (
                <MenuItem onClick={friendsClicked} sx={{ color: 'white' }} key='friends'>
                  Friends
                </MenuItem>
              )}
              {loggedIn
                ? pagesIfLoggedIn.slice(1).map((page) => (
                    <MenuItem key={uuidv4()} onClick={handleCloseNavMenu}>
                      {page}
                    </MenuItem>
                  ))
                : pagesIfNotLoggedIn.slice(1).map((page) => (
                    <MenuItem key={uuidv4()} onClick={handleCloseNavMenu}>
                      {page}
                    </MenuItem>
                  ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton sx={{ p: 0 }}>
                {loggedIn && <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />}
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
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
                onClose={handleCloseUserMenu}></Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <>
        <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
          {list('right')}
        </Drawer>
      </>
      {/* friends modal */}
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'>
          <FriendsModalForm />
        </Modal>
      </>
      {/* signup modal */}
      <>
        <Modal
          open={signupModal}
          onClose={handleCloseSignupModal}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'>
          {/* //PUT SIGN UP FORM HERE */}
          <FriendsModalForm />
        </Modal>
      </>
      {/* login modal */}
      <>
        <Modal
          open={loginModal}
          onClose={handleCloseLoginModal}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'>
          {/* //PUT LOGIN FORM HERE */}
          <FriendsModalForm />
        </Modal>
      </>
    </>
  );
};
export default Navbar;
