import React, { useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import InputComponent from '../CustomComponent/InputComponent';
import Notify from '@customComponent/Notify';
import SubmitButton from './SubmitButton';
import {makeStyles} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useHistory} from 'react-router-dom';


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


export default function AuthForm(props) {
  const classes = useStyles();

  const {formData, setFormData,inputFields,submitMethod,label,panel,from} = props


  const dispatch = useDispatch();

  const history = useHistory();

  const {error} = useSelector(state => state.sessionUser)

  const toast = Notify();


  const handleFieldChange = e => {

      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = (e)=>{
      console.log('fsd')
        e.preventDefault();
        dispatch(submitMethod(formData))
        .then(response=>{
          setFormData({
              email: "",
              password: "",
              remember: false,
              errors: {},
          })
          if(panel == 'admin'){
            history.push('/admin')
          }else{
            if(!from){
              history.push('/')  
            }else{
              history.push(from)
            }
            
          }
        })
        .catch(error=>{
          toast(error.message,'error')
        })
    }

    const hasError = (field) =>{
      if(error.errorCode === 422){
        return error.errors.hasOwnProperty(field)
      }
      return false
    }


  return (
                  <form onSubmit={handleSubmit}>

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
                                  error={hasError(field.name) ? error.errors[field.name][0] : ''}
                                  
                              />
                          ))
                      }

                      {
                        label == 'Login' &&
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
                      }

                      

                      <SubmitButton 
                          label={label}
                      />


                  </form>
  )
}

