import React from 'react';
import {makeStyles} from '@material-ui/core';
import clsx from 'clsx';


const useStyles = makeStyles(theme=>({

    logo1:{
        height:'100%',
        marginRight:'10px'
    },
    logo2:{
        height:'100%',
        marginLeft:'10px'
    },
    team:{
        height:'50px',
        display:'flex',
        alignItems:'center',
        // justifyContent:'center',
        ['@media (max-width:480px)'] : {
            margin:'5px 0'
          }
    },
    team1:{
        ['@media (max-width:480px)'] : {
            justifyContent:'flex-start !important'
          }
    },
    team2:{
        justifyContent:'flex-end',
        ['@media (max-width:480px)'] : {
            justifyContent:'flex-end !important'
          }

    },


    teamA:{
        height:'25px',
        display:'flex',
        alignItems:'center',
    },
    team2A:{
        justifyContent:'flex-end'
    },



    date:{
        ['@media (max-width:480px)'] : {
            fontSize:'12px'
          }
    },
    small:{
        ['@media (max-width:480px)'] : {
            fontSize:'10px'
          }
    },
    name:{
        // fontSize:'14px'
    }
  }));



export function Team1({logo,name,panel,imageStyle={}}) {
    const classes = useStyles();
    return(

        <div className={clsx({
            [classes.teamA] : panel == 'admin',
            [classes.team] : panel == 'user',
            [classes.team1] : panel == 'user',
            })}>
            <img src={logo} className={classes.logo1} style={imageStyle} />
            <div className={classes.name}>{name}</div>   
        </div>
    )
}

export function Team2({logo,name,panel,imageStyle={}}){
    const classes = useStyles();
    return(
        <div className={clsx({
            [classes.teamA] : panel == 'admin',
            [classes.team2A] : panel == 'admin',
            [classes.team] : panel == 'user',
            [classes.team2] : panel == 'user',
            })}>
          <div className={classes.name}>{name}</div> 
          <img src={logo} className={classes.logo2} style={imageStyle}/>  
        </div>
    )
}