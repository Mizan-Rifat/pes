import React from 'react'
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Fade,Zoom,Paper, ClickAwayListener, Button} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    height:'200px',
    width:'200px',
  },
  header:{
      background:'rgb(235,237,239)'
  }
}))


export default function ZoomBar({height,width}) {
    const classes = useStyles();
    return (
        <Paper className={classes.paper} style={{height,width}}>
            <div className={classes.header}>
                you have 4 unreade messages
            </div>

        </Paper>
    )
}
