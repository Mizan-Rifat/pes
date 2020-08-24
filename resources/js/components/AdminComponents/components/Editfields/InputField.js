import React, { useState } from 'react'
import {MenuItem,FormControl,Select,makeStyles,Input} from '@material-ui/core';

const useStyles = makeStyles(theme=>({
    formControl: {
        '&.MuiInputBase-root':{
            fontSize:'unset'
        },
    },
    textField:{
        '&.MuiInputBase-root':{
            fontSize:'14px'
        }
    },
}));

export default function InputField() {
    const classes = useStyles();
    const [value, setValue] = useState(value)

    const handleChange = (e)=>{
        setValue(e.target.value)
    } 
    return (
        <Input
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            name='date'
            className={classes.textField}
            onChange={handleChange}
            InputLabelProps={{
            shrink: true,
            }}
            style={{fontSize:'14px'}}
        />
    )
}
