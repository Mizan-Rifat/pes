import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import Progress from './Progress';

const useStyles = makeStyles(()=>({
    container:{
        position:'relative',
        display:'inline-block',
    },
    element:{
        position:'absolute',
        left:'50%',
        right:'50%',
        top:'25%'
    }
}))


export default function SubmitBtn(props) {
    const classes = useStyles();

    const {variant='contained'} = props;
    const {color='primary'} = props;
    const {handleSubmit,disabled,submitDisabled,label,progressStyle,btnStyle} = props;



    return (
        <div className={classes.container}>

            <Button 
                variant={variant} 
                color={color} 
                disabled={disabled || submitDisabled} 
                onClick={handleSubmit}
                style={btnStyle}
            >
                {label}

            </Button>
            {
                submitDisabled && <Progress style={progressStyle} />
            }
            
        
        </div>
    )
}
