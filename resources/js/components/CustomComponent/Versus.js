import React, { useEffect, useState } from 'react';
import {makeStyles} from '@material-ui/core';
import dateFormat from "dateformat";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme=>({
    container:{
        textAlign:'center',
        color:'#333',
    },  
    date:{
        fontSize:'14px',
        ['@media (max-width:480px)'] : {
            fontSize:'12px'
          }
    },
    small:{
        ['@media (max-width:480px)'] : {
            fontSize:'10px'
          }
    },
  }));


export default function Versus({panel,data,vdb,adb,approve}){
    const classes = useStyles();

    const {user} = useSelector(state => state.sessionUser)
    const [mode, setmode] = useState(0);
    const {team1_goals,team2_goals,date,round,leg,team1_id,team2_id,completed,tournament_id} = data

    useEffect(()=>{
        if(Object.keys(user).length > 0  && adb){

            if(team1_id == user.club.id){
                if(completed == 0 || completed == 4){
                    setmode(1)
                }else{
                    setmode(2)
                }
            }
            if(team2_id == user.club.id){
                if(completed == 0 || completed == 3){
                    setmode(1)
                }else{
                    setmode(2)
                }
            }
         
        }
    },[])
    return(
        <div className={classes.container}>
            {
                panel == 'vs' ?
                <h4>VS</h4>
                :
                <h4>{team1_goals} : {team2_goals}</h4>
            }
            
            <div className={classes.date}>
                {
                    date == 'N/A' ? date :
                    dateFormat(date,'dd mmm yy,h:MM TT')
                }
            </div>
            {/* <div className={classes.date}>08 Aug 20,10:02 PM</div> */}
            <small className={classes.small}>Round {round} | </small>
            <small className={classes.small}>Leg {leg}</small>
            {
                vdb && 
                    <Link to={`/result/details/${data.id}`} style={{display:'block'}}>
                        <small className={classes.small}>View Details</small>
                    </Link>
            }
            {
                approve && 
                    <Link to={`/result/approve/${data.id}`} style={{display:'block'}}>
                        <small className={classes.small}>Approve</small>
                    </Link>
            }
            {
                
                    mode == 1 &&
                     
                        <Link to={`/result/add/${data.id}`} style={{display:'block'}}>
                            <small className={classes.small}>Add Result</small>
                        </Link>
                    
            }
            {
                
                    mode == 2 &&
                     
                        <Link to={`/result/update/${data.id}`} style={{display:'block'}}>
                            <small className={classes.small}>Update Result</small>
                        </Link>
                    
            }
         
        </div>
    )
}
