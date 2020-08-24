import React, { useState,useEffect } from 'react';
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
    error:{
        color:'red',
        display:'block'
    }
}));

export default function EditComp({type,defaultValue,optionValue,name,options,handleChange}) {

    const classes = useStyles();

    const [value,setValue] = useState(type === 'select' ? optionValue : defaultValue)

    const handleOnChange = (e)=>{
        setValue(e.target.value)
        handleChange(name,e.target.value)
    }
    
    return (
        <>

            {
                type === 'date' &&
                    <Input
                        type="datetime-local"
                        defaultValue={value}
                        name='date'
                        className={classes.textField}
                        onChange={handleChange}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        style={{fontSize:'14px'}}
                    />
            }
            {
                type ==='input' &&
                    <>
                        <Input 
                            value={value} 
                            name={name}
                            onChange={handleOnChange} 
                            className={classes.formControl}  
                        />
                    </>
            }
            {
                type === 'select' &&
                    <FormControl>
                            <Select
                                value={value}
                                name={name}
                                onChange={handleOnChange}
                                className={classes.formControl}
                            >
                                {
                                    options.map((option,index)=>(
                                        <MenuItem value={option.value}>{option.label}</MenuItem>
                                    ))
                                }
                            </Select>
                    </FormControl>

            }

            
        </>
      
    )
}
