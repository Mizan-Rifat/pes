import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Auth from './Auth';
import { loginUser } from '../Redux/actions/SessionAction';
import AuthForm from './AuthForm'

const useStyles = makeStyles(theme=>({
    
   
}))


export default function Login() {

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



    const registrationForm = (
        <AuthForm 
            formData={formData}
            setFormData={setFormData}
            inputFields={inputFields}
            submitMethod={loginUser}
            label='Login'
        />
    )

    

    return (
        <Auth 
            form={registrationForm}
            type='login'
        />
    )
}
