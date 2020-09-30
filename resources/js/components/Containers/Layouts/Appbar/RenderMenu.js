import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser} from '../../../Redux/Ducks/SessionUserDuck';
import { logoutAdmin} from '../../../Redux/Ducks/SessionAdminDuck';
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
    const {user} = useSelector(state => state.sessionUser)


  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };


  const handleLogout = () =>{
    if(panel == 'admin'){
      dispatch(logoutAdmin())
      .then(res=>{
        history.push('/admin/login')
      })
    }else{
      dispatch(logoutUser())
    }
    
    setAnchorEl(null);
  }

  const handelProfileClick = ()=>{

    if(panel == 'admin'){
      history.push('/admin/profile')
    }else{
      history.push('/profile/personalinfo')
    }

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

          panel == 'admin' ?
                  <>
                    <MenuItem onClick={handelProfileClick} className={classes.menuItem} >Profile</MenuItem>
                    <MenuItem onClick={handleLogout} className={classes.menuItem}>Logout</MenuItem>
                  </>
          :
            Object.keys(user).length > 0  ?
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
