import React from 'react';
import {makeStyles} from '@material-ui/core';



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


export default function Versus({team1_goals,team2_goals,panel}){
    const classes = useStyles();
    return(
        <div className={classes.container}>
            {
                panel == 'vs' ?
                <h4>VS</h4>
                :
                <h4>{team1_goals} : {team2_goals}</h4>
            }
            
            <div className={classes.date}>08 Aug 20,10:02 PM</div>
            <small className={classes.small}>Round 1 | </small>
            <small className={classes.small}>Leg 1</small>
        </div>
    )
}
