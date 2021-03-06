import React from 'react';
import {makeStyles} from '@material-ui/core';
import clsx from 'clsx';


const useStyles = makeStyles(theme=>({

    image:{
        height:'100%',
    },
    mini:{
        height:'25px !important',
        marginRight:'5px',
    },
    container:{
        height:'50px',
        display:'flex',
        alignItems:'center',
        ['@media (max-width:480px)'] : {
            margin:'5px 0'
          }
    },
  }));



export function ListGroupItem1({image,icon,label,mini,imageStyle={},containerStyle={},labelStyle={}}) {
    const classes = useStyles();
    return(

        <div className={clsx(classes.container)} style={containerStyle}>
            {
                image && 
                <img 
                    src={image} 
                    className={clsx(classes.image,{
                        [classes.mini] : mini
                    })} 
                    style={imageStyle} 
                />
            }
            
            {icon}
            <div className={classes.label} style={labelStyle}>{label}</div>   
        </div>
    )
}
export function ListGroupItem2({image,icon,label,mini,imageStyle={},containerStyle={},labelStyle={}}) {
    const classes = useStyles();
    return(

        <div className={clsx(classes.container)} style={containerStyle}>

            <div className={classes.label} style={labelStyle}>{label}</div>
           
            {
                image && 
                <img 
                    src={image} 
                    className={clsx(classes.image,{
                        [classes.mini] : mini
                    })} 
                    style={imageStyle} 
                />
            }
            
            {icon}
              
        </div>
    )
}

