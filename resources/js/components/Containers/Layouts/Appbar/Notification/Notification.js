import React,{useState} from 'react';
import {Divider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Link } from 'react-router-dom';
import { ResultSubmitted, ResultApproved,Welcome, AddedInTournament, FixturesCreated, AddedAsOfficial } from './NotificationComponent';
import { useSelector, useDispatch } from 'react-redux';
import dateFormat from "dateformat";
import clsx from 'clsx'
import { notificationMarkAsRead,notificationMarkAsUnRead, deleteNotification } from '../../../../Redux/Ducks/NotificationsDuck';
import Scrollbar from 'react-scrollbars-custom';

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
      background:theme.palette.success.light,
      // background:'rgb(235,237,239)',
      padding:'5px 10px',
      color:'white',
      
    },
    footer:{
      background:theme.palette.success.light,
      padding:'7px',
      color:'white',
      textAlign:'center'
    },
    listItem:{
    //   height:'70px',
      listStyle:'none',
      // display:'flex',
      padding:'8px',
      cursor:'pointer',
      '&:hover' :{
        background:'rgb(235,237,239)',
      },
      color:'#4f5d73'
    },
    itemContainer:{
      display:'flex',
      fontSize:'12px'
    },
    msg:{
      flexGrow:1,
      // padding:'2px 10px'
    },
    list:{
      padding:0,
      margin:0,
      // maxHeight:'250px',
      overflow:'auto'
    },
    itemFooter:{
      marginTop:'7px',
      fontSize:'10px',
      display:'flex',
      // justifyContent:'space-between'
    },
    unRead:{
      background:'rgb(224,224,224)',
    }
  }));

export default function Notification({count}) {
    const classes = useStyles();

    const {notifications} = useSelector(state => state.notifications)


    const dispatch = useDispatch();

    const markAsRead = (id)=>{
      dispatch(notificationMarkAsRead(id))
    }
    const markAsUnRead = (id)=>{
      dispatch(notificationMarkAsUnRead(id))
    }
    const deletenotification = (id)=>{
      dispatch(deleteNotification(id))
    }


    const component=(data)=>{
      switch (data.type) {
        case 9:
          return <ResultApproved data={data} />
          break;
        case 14:
          return <ResultSubmitted data={data} />
          break;
        case 5:
          return <Welcome />
          break;
        case 6:
          return <AddedInTournament data={data} />
          break;
        case 8:
          return <FixturesCreated data={data} />
          break;
        case 7:
          return <AddedAsOfficial data={data} />
          break;
      
        default:
          break;
      }
    }
    
    return (
        <div className={classes.comp}>
                <div className={classes.header}>
                  {
                    count > 0 ?
                        <strong>You have {count} new notifications</strong>
                        :
                        'Notifications'
                  }
                  
                </div>
                <Divider />

                <div style={{overflow:'auto',padding:1}}>
                    <Scrollbar style={{height:'260px'}} >
                      
                        <ul className={classes.list}>
                        

                          {
                            notifications.map((item,index)=>(
                              <>
                                  <li 
                                      key={index} 
                                      className={
                                        clsx(classes.listItem,{
                                          [classes.unRead]:item.read_at == null
                                          })}
                                  >
                                    
                                    <div className={classes.itemContainer}>
                                        {component(item.data)}
                                    </div>
                                    <div className={classes.itemFooter}>
                                        <div style={{flexGrow:1}}>
                                          {dateFormat(item.created_at,'dd mmm,h:MM TT')}
                                        </div>
                                        <Link onClick={()=>deletenotification(item.id)} style={{marginRight:'8px'}}>Delete</Link>
                                        {
                                          item.read_at == null ?
                                          <Link onClick={()=>markAsRead(item.id)}>Mark As Read</Link>
                                          :
                                          <Link onClick={()=>markAsUnRead(item.id)}>Mark As UnRead</Link>
                                        }
                                        
                                    </div>

                                  </li>
                                  <Divider />
                              </>
                            ))
                          }


                        </ul>

                    </Scrollbar>

                </div>
               
                <div className={classes.footer}>
                    {/* <strong><Link style={{color:'white'}}>Load More</Link></strong> */}
                </div>

        </div>
    )
}

