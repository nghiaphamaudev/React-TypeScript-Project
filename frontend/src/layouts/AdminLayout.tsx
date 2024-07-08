import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import List from '@mui/material/List';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import { Link, Outlet } from 'react-router-dom';
import AccountMenu from 'src/components/admin/avatar/Avatar';

import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import StarBorder from '@mui/icons-material/StarBorder';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openMenu, setOpenMenu] = React.useState(false);

  const handleClick = () => {
    setOpenMenu(() => !openMenu);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const inboxIcon = [
    <DashboardIcon />,
    <Inventory2Icon />,
    <PeopleAltIcon />,
    <BarChartIcon />,
  ];

  const mailIcon = [<SettingsIcon />, <LogoutIcon />];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <header className="antialiased  w-full fixed mb-20">
          <nav className="bg-slate-50 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex justify-start items-center">
                <IconButton
                  color="primary"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                  <MenuIcon />
                </IconButton>

                <form
                  action="#"
                  method="GET"
                  className="hidden lg:block lg:pl-2"
                >
                  <label htmlFor="topbar-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative mt-1 lg:w-96">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        {' '}
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />{' '}
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="email"
                      id="topbar-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search"
                    />
                  </div>
                </form>
              </div>
              <div className="flex items-center lg:order-2">
                <button
                  type="button"
                  className="hidden sm:inline-flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 fixed right-28"
                >
                  <AddIcon />
                  New Widget
                </button>
                <div className="fixed right-10">
                  {' '}
                  <AccountMenu
                    explain="Pham Nghia Jr"
                    source="https://img.freepik.com/free-photo/happy-proud-pleased-asian-male-clap-hands-cheerful-surprised-guy-applausing-congratulating-with-achievement-praising-great-work-saying-well-done-coworker-white-background_1258-55338.jpg?t=st=1720280350~exp=1720283950~hmac=ee20aff309bc0f530a13c81854b3f76a3da9dd8bf41c111567af22e964e8dba2&w=1380"
                  />
                </div>
              </div>
            </div>
          </nav>
        </header>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <a href="https://flowbite.com" className="flex mr-4">
            <img
              src="https://flowbite.s3.amazonaws.com/logo.svg"
              className="mr-3 h-8"
              alt="FlowBite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['DashBoard', 'Products', 'Users', 'Chart'].map((text, index) => {
            if (text === 'Chart') {
              return (
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                  }}
                  component="nav"
                  key={text}
                  aria-labelledby="nested-list-subheader"
                  subheader={undefined}
                >
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                      <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    {openMenu ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="User" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </List>
              );
            }
            return (
              <ListItem key={text} disablePadding>
                <Link to={`/admin/${text.toLowerCase()}`}>
                  {' '}
                  <ListItemButton>
                    <ListItemIcon>{inboxIcon[index]}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <List>
          {['Setting', 'Logut'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{mailIcon[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
