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
}));

export default function SelectComp({type,props}) {
    const classes = useStyles();
    const [options,setOptions] = useState([])
    const [value,setValue] = useState(1)

    useEffect(()=>{
        console.log({props})
      },[])

    useEffect(() => {
        switch (type) {
            case 'teamlist':
                setOptions([
                    {
                        label:'Fc Red Rangers',
                        value:1
                    },
                    {
                        label:'Fc Barcelona',
                        value:2
                    },
                ])
                
                break;

            case 'group':
                setOptions([
                    {
                        label:'A',
                        value:1
                    },
                    {
                        label:'B',
                        value:2
                    },
                ])

                break;

            case 'round':
                setOptions([
                    {
                        label:1,
                        value:1
                    },
                    {
                        label:2,
                        value:2
                    },
                ])
            break;
        
            default:
                break;
        }
       
    }, [])



    const handleChange = (e)=>{
        setValue(e.target.value)
        props.onChange(e.target.value)
    }
    
    return (

        type === 'date' ?
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
            :
            <FormControl>
                    <Select
                        value={value}
                        onChange={handleChange}
                        className={classes.formControl}
                    >
                        {
                            options.map((option,index)=>(
                                <MenuItem value={option.value}>{option.label}</MenuItem>
                            ))
                        }
                    </Select>
            </FormControl>
      
    )
}
