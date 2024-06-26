import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import MenuIcon from '@mui/icons-material/Menu';
import React, {useContext, useState} from "react";
import AuthContext from "../../../context/Auth";
import {useNavigate} from "react-router-dom";
import DialogUser from "../../../dialogs/dialog-user";
import {IUser} from "../../../../model/IUser.ts";
import useUsers from "../../../../hooks/useUsers";
import StringAvatar from "../../../helpers/StringAvatar.ts";
import {toast} from "react-toastify";

const pages = [
  {
    name: "Project",
    router: "/"
  },
  {
    name: "Teams",
    router: "/teams"
  },
];
const settings = ['Profile', 'Logout'];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [valueUser, setValueUser] = useState<IUser | null>(null);
  const _user = useUsers();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (values: IUser) => {
    // console.log(values);
    _user.updateUser(values);
    setValueUser(values);
    handleCloseModal();
    toast.success("User updated successfully.");
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleNavigate(router: string) {
    navigate(router);
  }

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <RocketLaunchIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: {xs: 'none', md: 'flex'},
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>

          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon/>
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
                display: {xs: 'block', md: 'none'},
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={() => {
                  handleCloseNavMenu();
                  handleNavigate(page.router);
                }}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <RocketLaunchIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: {xs: 'flex', md: 'none'},
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => {
                  handleCloseNavMenu();
                  handleNavigate(page.router);
                }}
                sx={{my: 2, color: 'white', display: 'block'}}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{flexGrow: 0}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                <Avatar alt="User Avatar"
                        src={valueUser?.photo || authContext?.user?.photo}
                        {...StringAvatar(authContext?.user?.name)}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{mt: '45px'}}
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => {
                  if (setting === "Logout") {
                    if (authContext) {
                      authContext.handleLogout();
                    }
                  }
                  if (setting === "Profile") {
                    handleOpenModal();
                  }
                  handleCloseUserMenu();
                }}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        <DialogUser
          editing
          open={modalOpen}
          onClose={handleCloseModal}
          initialValues={authContext?.user}
          onSubmit={handleSubmit}/>
      </Container>
    </AppBar>
  );
}

export default Header;