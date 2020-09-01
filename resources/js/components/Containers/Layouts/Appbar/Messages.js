import React,{useState} from 'react';
import {Divider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    paper: {
      backgroundColor: theme.palette.background.paper,
      // height:'350px',
      
    },
    comp:{
      width:'500px',
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
      height:'70px',
      listStyle:'none',
      display:'flex',
      padding:'10px',
      cursor:'pointer',
      '&:hover' :{
        background:'rgb(235,237,239)',
      }
    },
    dp:{
      height:'50px',
      width:'50px',
      background:'#EEE',
      borderRadius:'50%',
    },
    details:{
      flexGrow:1,
      padding:'0 10px'
    },
    detailsHeading:{
      display:'flex',
      justifyContent:'space-between',
      color:'#4f5d73'
     
    },
    msg:{
      marginTop:'3px',
      color:'#768192'
    },
    name:{
      
    }
  }));

export default function Messages() {
    const classes = useStyles();
    const [message, setmessage] = useState('boris cupidatat ut exercitation nulla irure duis fugiat fgjhfghf');
    
    return (
        <div className={classes.comp}>
                <div className={classes.header}>
                  <strong>You have 4 unread messages</strong>
                </div>
                <Divider />
                <ul style={{padding:0,margin:0}}>
                  <li className={classes.listItem}>
                    <div className={classes.dp} />

                    <div className={classes.details}>

                      <div className={classes.detailsHeading}>

                        <strong className={classes.name}> Mizan Rifat</strong>
                        <div className={classes.time}>11.30</div>    

                      </div>

                      <div className={classes.msg}>
                          {`${message.substring(0, 66)}...`}
                      </div>
                    </div>

                  </li>
                  <Divider />
                  <li className={classes.listItem}>
                    <div className={classes.dp} />

                    <div className={classes.details}>

                      <div className={classes.detailsHeading}>

                        <strong className={classes.name}> Mizan Rifat</strong>
                        <div className={classes.time}>11.30</div>    

                      </div>

                      <div className={classes.msg}>
                          {`${message.substring(0, 66)}...`}
                      </div>
                    </div>

                  </li>
                  <Divider />
                  <li className={classes.listItem}>
                    <div className={classes.dp} />

                    <div className={classes.details}>

                      <div className={classes.detailsHeading}>

                        <strong className={classes.name}> Mizan Rifat</strong>
                        <div className={classes.time}>11.30</div>    

                      </div>

                      <div className={classes.msg}>
                          {`${message.substring(0, 66)}...`}
                      </div>
                    </div>

                  </li>
                  <Divider />
                </ul>

                <div className={classes.footer}>
                    <strong>View All Messages</strong>
                </div>
        </div>
    )
}
