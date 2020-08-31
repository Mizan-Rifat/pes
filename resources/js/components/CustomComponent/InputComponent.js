import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import ErrorIcon from "@material-ui/icons/Error";


const useStyles = makeStyles(theme=>({
    
    inputGroup:{
        display:'flex',
        position:'relative',
        // marginBottom:'1rem'
    },
    inputIconContainer:{
        background: theme.palette.secondary.main,
        // background: '#c0392b',
        borderRadius: '0.25rem 0 0 0.25rem',
        color:'white',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:'.375rem .75rem'
    },
    formControl:{
        borderRadius:0
    },
    errorIcon: {
        position: "absolute",
        right: "5px",
        top: "7px",
        color: theme.palette.secondary.main,
        zIndex: 10,
      },
    error:{
        marginLeft: "50px",
        color: theme.palette.secondary.light,
    }
}))

export default function InputComponent(props) {

    const {icon,type,name,placeholder,error,value,handleChange} = props

    const classes = useStyles();


    const hasError = ()=>{
        return !!error;
    }

    return (
            <>
                <div
                    className={clsx(classes.inputGroup,{
                            'mb-3' : false
                        })
                    }
                >
                    <div className="input-group-append">
                        <span className={classes.inputIconContainer}>
                            {icon}
                        </span>
                    </div>

                    <input
                        type={type}
                        name={name}
                        className={clsx('form-control',[classes.formControl])}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                    />

                  
                    <ErrorIcon
                        className={clsx(classes.errorIcon, {
                                    "d-none": !hasError(),
                                    })}
                    />
            
            
                </div>
                
                { 
                
                    hasError && 

                        <small className={classes.error}>
                            {error}
                        </small>
                }

            </>

    )
}
