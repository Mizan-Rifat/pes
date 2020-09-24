import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, logoutAdmin } from '../../../Redux/actions/SessionAction';
import { useHistory } from 'react-router-dom';
import Messages from './Messages';

const useStyles = makeStyles((theme) => ({

  menuItem:{
    margin: '5px',
    borderRadius: '3px',
    '&:hover':{
      background: theme.palette.primary.main,
    //   background: '#9c27b0',
      color:'white'
    }
  }
}));


export default function RenderMenu({anchorEl, setAnchorEl,panel}) {

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.session)


  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };


  const handleLogout = () =>{
    if(panel == 'admin'){
      dispatch(logoutAdmin())
    }else{
      dispatch(logoutUser())
    }
    
    setAnchorEl(null);
    // handleMobileMenuClose();
  }

  const handelProfileClick = ()=>{
    
    history.push('/profile')
    setAnchorEl(null);
  }
  const handelMyClubClick = ()=>{
    
    history.push(`/club/${user.club.slug}`)
    setAnchorEl(null);
  }
  

  return (
    <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        // id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
    >

        {
            Object.keys(user).length > 0 || panel == 'admin' ?
                <>
                    <MenuItem onClick={handelProfileClick} className={classes.menuItem} >Profile</MenuItem>
                    <MenuItem onClick={handelMyClubClick} className={classes.menuItem} >My Club</MenuItem>
                    <MenuItem onClick={handleLogout} className={classes.menuItem}>Logout</MenuItem>
                </>
                :  
                <>
                    <MenuItem onClick={()=>history.push('/login')} className={classes.menuItem} >Login</MenuItem>
                    <MenuItem onClick={()=>history.push('/register')} className={classes.menuItem}>Register</MenuItem>
                </>
        }

        

    </Menu>
  );
}
