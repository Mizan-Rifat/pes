import React from 'react';
import { Paper, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper:{
        boxShadow: "0 1px 4px 0 rgba(0,0,0, 0.14)",
        margin:'10px',
    },
    heading: {
        background: '#EEEEEE',
        padding: '20px',
        fontSize: '16px',
    }

}))

export default function CompContainer(props) {
    const classes = useStyles();
    return (
        <Paper variant="outlined" square className={classes.paper}>
            <div className={classes.heading}>
                <div style={{ fontWeight: 'bold' }}>{props.title}</div>
            </div>
            <div className="" style={{ padding: '20px' }}>
                {props.children}
            </div>
        </Paper>
    )
}
