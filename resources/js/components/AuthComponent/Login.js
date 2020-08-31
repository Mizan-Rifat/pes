import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';

import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import clsx from 'clsx';
import ErrorIcon from "@material-ui/icons/Error";
import InputComponent from '../CustomComponent/InputComponent';
import { Button } from '@material-ui/core';
import SubmitButton from './SubmitButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom'
import Auth from './Auth';
import useForm from './useForm';

const useStyles = makeStyles(theme=>({
    formControlLabel:{
        '&.MuiFormControlLabel-root':{
            display:'block',
            color:'white'
        },
       
    },
    checkbox:{
        '&.MuiCheckbox-root':{
            color:theme.palette.secondary.light
        }
    },
   
}))


export default function Login() {

    

    return (
        <Auth 
            form={<LoginForm  />}
            type='login'
        />
    )
}


function LoginForm() {
    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
        errors: {},
    })

    const [inputFields, setinputFields] = useState([
       
        {
            icon:<EmailIcon />,
            type:'email',
            placeholder:'Email',
            name:'email'
        },
        {
            icon:<VpnKeyIcon />,
            type:'password',
            placeholder:'Password',
            name:'password'
        },
    ])

    const handleFieldChange = e => {

        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };


    const classes = useStyles();

    return (
                    <form>

                        {
                            inputFields.map((field,index)=>(
                                <InputComponent
                                    key={index} 
                                    icon={field.icon}
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={formData[field.name]}
                                    handleChange={handleFieldChange}
                                    
                                />
                            ))
                        }

                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={formData.remember}
                                onChange={e =>
                                    setFormData({
                                    ...formData,
                                    remember: e.target.checked,
                                    })
                                }
                                name="remember"
                                color="secondary"
                                className={classes.checkbox}
                            />
                            }
                            label="Remember me"
                            className={classes.formControlLabel}
                        />

                        <SubmitButton 
                            label='Login'
                        />


                    </form>
    )
}
