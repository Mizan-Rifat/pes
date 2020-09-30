import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Auth from './Auth';
import EmailIcon from '@material-ui/icons/Email';
import { registerUser } from '../Redux/Ducks/SessionUserDuck';
import AuthForm from './AuthForm';


const useStyles = makeStyles(theme=>({
   
}))

export default function Registration() {

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

    const registrationForm = (
        <AuthForm 
            formData={formData}
            setFormData={setFormData}
            inputFields={inputFields}
            submitMethod={registerUser}
            label='Register'
            form={false}
        />
    )

    return (
        <Auth 
            form={registrationForm}
            type='registration'
        />
    )
}
