import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles(theme=>({
   btn:{
       padding:'6px 40px',
       margin:'20px 0'
   }
}))


export default function SubmitButton({label}) {
    const classes = useStyles();
    return (
        <div className='d-flex justify-content-center'>
            <Button    
                variant='contained' 
                color='secondary' 
                disableElevation
                className={classes.btn}
            >
                {label}
            </Button>
        </div>
    )
}
