import React, { useState } from 'react'
import { Paper, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Progress from './Progress';


const useStyles = makeStyles((theme) => ({
    paper:{
        boxShadow: "0 1px 4px 0 rgba(0,0,0, 0.14)",
        height:'100%',
        position:'relative'
    },
    heading: {
        background: theme.palette.primary.main,
        color:theme.palette.primary.contrastText,
        // background: '#EEEEEE',
        padding: '20px',
        fontSize: '16px',
    },
    chContainer:{
        padding:'20px',
    },
    disable:{
        pointerEvents:'none',
        opacity:'.5'
    }

}))

export default function PrimaryLayout(props) {
    const classes = useStyles();
    const {title,loading} = props

    return (

        <Paper variant="outlined" square className={classes.paper}>
            <div className={classes.heading}>
                <div style={{ fontWeight: 'bold' }}>{title}</div>
            </div>
            <div className={clsx(classes.chContainer,{
                [classes.disable] : loading
            })}>

                {props.children}
               
            </div>
                {
                    loading && <Progress />
                }
        </Paper>

    )
}
