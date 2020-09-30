import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Auth from './Auth';
import { loginUser } from '../Redux/Ducks/SessionUserDuck';
import { loginAdmin } from '../Redux/Ducks/SessionAdminDuck';
import AuthForm from './AuthForm'

const useStyles = makeStyles(theme=>({
    
   
}))


export default function Login(props) {

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
            submitMethod={ props.panel ==  'admin' ? loginAdmin : loginUser}
            label='Login'
            panel={props.panel}
            from={props.location.state ? props.location.state.from.pathname : false} 
        />
    )

    

    return (
        <Auth 
            form={registrationForm}
            type='login'
            panel={props.panel}
        />
    )
}
