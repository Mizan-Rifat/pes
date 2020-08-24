import React from 'react';
import {makeStyles} from '@material-ui/core';



const useStyles = makeStyles(theme=>({

    logo:{
        height:'100%',
        margin:'0 10px'
    },
    team:{
        height:'25px',
        display:'flex',
        alignItems:'center',
    },
  }));
  
export default function ClubListItem({logo,name}) {
    const classes = useStyles();
    return(
        
        <div className={classes.team}>
          <img src={`http://127.0.0.1:8000/images/logo/${logo}`} className={classes.logo}/>
          <div>{name}</div>   
        </div>
    )
}
