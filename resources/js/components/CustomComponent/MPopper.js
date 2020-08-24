import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import {Fade,Zoom,Paper, ClickAwayListener, Button, Divider} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    // height:'350px',
    
  },
  popper:{
    zIndex:1000000000000
  },
}));

export default function MPopper({anchorEl,setAnchorEl,component}) {

  const classes = useStyles();
//   const [anchorEl, setAnchorEl] = React.useState(null);


  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;



  return (
    

      <Popper id={id} open={open} anchorEl={anchorEl} transition disablePortal placement='bottom-end' className={classes.popper}>
        {({ TransitionProps,placement }) => (

          <Zoom {...TransitionProps} 
          style={{
            transformOrigin: 'top right'
          }}
          >
            
              <Paper elevation={4} className={classes.paper}>
                <ClickAwayListener onClickAway={()=>setAnchorEl(null)}>
                  <div>
                    {component}
                  </div>
                </ClickAwayListener>
                
              </Paper>
            
        </Zoom>
        )}
      </Popper>
   
  );
}

// Laboris cupidatat ut exercitation nulla irure duis fugiat in. Nostrud ea laborum ut adipisicing non. Nostrud non aliquip qui labore tempor anim ad occaecat nisi. Ipsum qui do qui aliquip. Exercitation do laborum in amet ut magna reprehenderit.