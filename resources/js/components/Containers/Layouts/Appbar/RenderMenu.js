import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../Redux/actions/SessionAction';
import { useHistory } from 'react-router-dom';

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
    handleMobileMenuClose();
  };


  const handleLogout = () =>{

    dispatch(logoutUser())
    setAnchorEl(null);
    handleMobileMenuClose();
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
                    <MenuItem onClick={handleMenuClose} className={classes.menuItem} >Profile</MenuItem>
                    <MenuItem onClick={handleMenuClose} className={classes.menuItem}>My account</MenuItem>
                    <MenuItem onClick={handleLogout} className={classes.menuItem}>Logout</MenuItem>
                </>
                :  
                <>
                    <MenuItem onClick={()=>history.push('/login')} className={classes.menuItem} >Loign</MenuItem>
                    <MenuItem onClick={()=>history.push('/register')} className={classes.menuItem}>Register</MenuItem>
                </>
        }

        

    </Menu>
  );
}
