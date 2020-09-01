import React from 'react'
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
import LinearProgress from '@material-ui/core/LinearProgress';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useDispatch,useSelector } from 'react-redux';


const useStyles = makeStyles(theme=>({
    container:{
        background:theme.palette.primary.main,
        height:'100vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    card:{
        // height: '480px',
        // width: '350px',
        height: '450px',
        width: '340px',
        marginTop: '75px',
        // background: theme.palette.primary.light,
        background: '#353D5A',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        borderRadius: '5px',
    },
    logoContainer:{
        position: 'absolute',
        height: '170px',
        width: '170px',
        top: '-75px',
        borderRadius: '50%',
        background: theme.palette.primary.dark,
        padding: '10px',
        // textAlign: 'center',
        border:`2px solid red`,
        // border:`2px solid ${theme.palette.secondary.light}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center'
    },
    logoImg:{
        height:'90px'
    },
    formContainer:{
        display:'flex',
        justifyContent:'center',
        marginTop:'115px'
    },
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
    footer:{
        display:'flex',
        justifyContent:'center'
    },
    pbContainer: {
        width: "100%",
        "& > * + *": {
          marginTop: theme.spacing(2),
        },
        position: "absolute",
        bottom: 0,
    },
    formDisable: {
        pointerEvents: "none",
        opacity: "0.5",
    },
   
}))

const theme = createMuiTheme({
    overrides: {
      MuiLinearProgress: {
          root:{
            // bottom:'-24px'
          },
        colorPrimary: {
          backgroundColor: "#676CAD",
        },
        barColorPrimary: {
          backgroundColor: "#353D5A",
        },
      },
    },
  });

export default function Auth({form,type}) {

    const classes = useStyles();
    const {loading} = useSelector(state => state.session)

    return (
        <div className={classes.container}>
            <div className={classes.card}>

                <div className='d-flex justify-content-center'>
                    <div className={classes.logoContainer}>
                        {/* <Link to='/'> */}
                            <img src='/images/logo/pes.png' className={classes.logoImg}/>
                        {/* </Link> */}
                    </div>
                </div>

                <div className={clsx({[classes.formDisable]: loading})}>

                    <div className={classes.formContainer}>
                        {form}
                    </div>

                    <Footer type={type} />

                </div>


                {
                    loading &&
                
                    <div className={classes.pbContainer}>
                        <ThemeProvider theme={theme}>
                            <LinearProgress />
                        </ThemeProvider>
                    </div>
                }

            </div>
        </div>
    )
}

function Footer({type}){
    const classes = useStyles();

    return (

            <div className={classes.footer}>
                {
                    type == 'login' && 
                    <>
                        <p style={{color:'white'}}>Don't have an account?</p>
                        <Link to='/registration' style={{marginLeft:'5px'}}>Register</Link>
                    </>
                }
                {
                    type == 'registration' && 
                    <>
                        <p style={{color:'white'}}>Already Have An Account?</p>
                        <Link to='/login' style={{marginLeft:'5px'}}>Login</Link>
                    </>
                }
                
            </div>
    )
}
