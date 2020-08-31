import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
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
import EmailIcon from '@material-ui/icons/Email';


const useStyles = makeStyles(theme=>({
   
}))

export default function Registration() {


    return (
        <Auth 
            form={<RegistrationForm />}
            type='registration'
        />
    )
}


function RegistrationForm() {
    const classes = useStyles();


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        errors: [],
    })

    const [inputFields, setinputFields] = useState([
        {
            icon:<PersonIcon />,
            type:'text',
            placeholder:'User Name',
            name:'name'
        },
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
        {
            icon:<VpnKeyIcon />,
            type:'password',
            placeholder:'Confirm Password',
            name:'password_confirmation'
        },
    ])

    const handleFieldChange = e => {

        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

    


   

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

                        

                        <SubmitButton 
                            label='Register'
                        />


                    </form>
    )
}

