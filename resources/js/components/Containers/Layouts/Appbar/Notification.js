import React,{useState} from 'react';
import {Divider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles((theme) => ({
    paper: {
      backgroundColor: theme.palette.background.paper,
      // height:'350px',
      
    },
    comp:{
      width:'300px',
    },
    popper:{
      zIndex:1000000000000
    },
    header:{
      background:'rgb(235,237,239)',
      padding:'5px 10px',
      color:'#8a93a2',
      
    },
    footer:{
      background:'rgb(235,237,239)',
      padding:'15px 20px',
      color:'#455164',
      
    },
    listItem:{
    //   height:'70px',
      listStyle:'none',
      display:'flex',
      padding:'10px',
      cursor:'pointer',
      '&:hover' :{
        background:'rgb(235,237,239)',
      },
      color:'#4f5d73'
    },
    itemContainer:{
      display:'flex'
    },
    msg:{
      flexGrow:1,
      padding:'2px 10px'
    },
  }));

export default function Notification() {
    const classes = useStyles();
    const [message, setmessage] = useState('boris cupidatat ut exercitation nulla irure duis fugiat fgjhfghf');
    
    return (
        <div className={classes.comp}>
                <div className={classes.header}>
                  <strong>You have 5 new notifications</strong>
                </div>
                <Divider />

                <ul style={{padding:0,margin:0}}>

                  <li className={classes.listItem}>
                    
                    <div className={classes.itemContainer}>
                        <div className={classes.icon}>
                            <PersonAddIcon />
                        </div>
                        <div className={classes.msg}>
                            New User Registered
                        </div>


                    </div>

                  </li>
                  <Divider />
                  <li className={classes.listItem}>
                    
                    <div className={classes.itemContainer}>
                        <div className={classes.icon}>
                            <PersonAddIcon />
                        </div>
                        <div className={classes.msg}>
                            New User Registered
                        </div>


                    </div>

                  </li>
                  <Divider />
                  <li className={classes.listItem}>
                    
                    <div className={classes.itemContainer}>
                        <div className={classes.icon}>
                            <PersonAddIcon />
                        </div>
                        <div className={classes.msg}>
                            New User Registered
                        </div>


                    </div>

                  </li>
                  <Divider />


                </ul>

        </div>
    )
}

