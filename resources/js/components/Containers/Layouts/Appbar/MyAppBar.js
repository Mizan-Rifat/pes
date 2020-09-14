import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import clsx from 'clsx'
import { Hidden } from '@material-ui/core';
// import {drawerWidth} from '../AdminLayout';
import Messages from './Messages';
import Notification from './Notification';
import RenderMenu from './RenderMenu';
import DesktopSection from './DesktopSection';
import {Link} from 'react-router-dom';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Navbar from './Navbar';



const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: 260,
    },
  },
  sectionDesktop: {
    display: 'flex',
    // [theme.breakpoints.up('md')]: {
    //   display: 'flex',
    // },
  },
  logo:{
    height:'50px',
    margin:'0 30px'
  },
}));


export default function MyAppBar(props) {

  const {handleDrawerToggle,panel} = props

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    
            <div>
              <HideOnScroll {...props}>
                  <AppBar 
                    position="fixed"  
                    className={clsx({[classes.appBar] : panel == 'admin' })}
                    >

                    <Toolbar>

                        <Hidden smUp implementation="css">
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerToggle}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Hidden>


                        <Link to='/'>

                            <img src='/images/logo/pes.png' className={classes.logo}/>

                        </Link>


                      
                      <div className={classes.grow} />


                      <div className={classes.sectionDesktop}>

                          
                        <DesktopSection 
                            icon={<MailIcon />}
                            component={<Messages />}
                            count={4}
                        />
                        <DesktopSection 
                            icon={<NotificationsIcon />}
                            component={<Notification />}
                            count={4}
                        />


                        <div>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                // aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>


                    </div>
                    </Toolbar>


                    {
                      panel == 'user' && <Navbar />
                    }

                        
                  </AppBar>

                  </HideOnScroll>

              <RenderMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} panel={panel} />
            </div>
  );
}

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger();
  // const trigger = useScrollTrigger({ target: window ? window() : undefined });


  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}