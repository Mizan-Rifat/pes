import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(()=>({
    element:{
        position:'absolute',
        left:'50%',
        right:'50%',
        top:'50%'
    }
}))

export default function Progress(props) {
    const classes = useStyles();

    const {size = 24} = props;
    const {style = {}} = props;

    return (
        <div >
            <CircularProgress size={size} className={classes.element} style={style} />
        </div>
    )
}
