import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    wrapper:{
        display:'flex',
        justifyContent:'center',
        textAlign:'center',
        
        
    },
    title:{
        width:'300px',
        background:'rgb(241, 203, 41)',
        padding:'20px',
        borderBottom:'1px solid rgb(51,51,51)'
    }
}));


export default function Title({title,titleStyle={}}) {
    const classes = useStyles();
    return (
        <div className={classes.wrapper} >
            <h4 className={classes.title} style={titleStyle}>{title}</h4>
        </div>
    )
}
