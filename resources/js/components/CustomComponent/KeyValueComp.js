import React, { useState,useEffect } from 'react';
import {MenuItem,FormControl,TextField,Button,makeStyles, IconButton,Tooltip, Grid} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector, useDispatch } from 'react-redux';
import EditComp from '@customComponent/EditComp';
import { updateTournamentInfo } from '@actions/infoAction';
import Notify from '@customComponent/Notify';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import MIconButton from '@customComponent/MIconButton';
import SearchComp2 from './SearchComp2';

const useStyles = makeStyles(theme=>({
    td:{
        padding:'15px',
        
    },
    tdedit:{
        padding:'0 15px',
        
    },
    formControl:{
        '&.MuiInputBase-root':{
            fontSize:'unset'
        },
        
    },
    savebtn:{
        borderRadius:0
    }
    
}));

export default function KeyValueComp({fields,value,saveAction,editMode,setEditMode,editable}) {
  
    const classes = useStyles();

    const dispatch = useDispatch();

    const toast = Notify();


    const [formData, setFormData] = useState({})

    const [error, seterror] = useState({})

    const handleChange = (label,value) => {
        setFormData({
            ...formData,
            [label]:value
        })
    }

    const handleSave = () => {
        console.log({formData})
        dispatch(saveAction(formData))
        .then(response=>{
            toast(response,'success')
            setEditMode(false)
            seterror({})
        })
        .catch(error=>{
            seterror(error)
            toast(error.message,'error')
        })

    }

    const hasError = (field) =>{
      if(error.errorCode === 422){
        return error.errors.hasOwnProperty(field)
      }
      return false
    }
    

    
    useEffect(()=>{
        let obj = {};
        Object.keys(value).map(item=>{
            obj[item]=value[item]
        })
        setFormData(obj)
    },[fields,value])
    
    useEffect(()=>{
        let obj = {};
        Object.keys(value).map(item=>{
            obj[item]=value[item]
        })
        setFormData(obj)
    },[fields,value])




    return (
        <div>

            {
                editable &&
            
                <div className='text-right'>
                    {
                        editMode ? 

                        <div className='d-flex justify-content-end'>
                            
                            <MIconButton title='Save' handleClick={handleSave} icon={<SaveIcon />} /> 

                            <MIconButton title='Cancel' handleClick={()=>setEditMode(false)} icon={<CancelIcon />} /> 

                        </div> 

                        :

                        <MIconButton title='Edit' handleClick={()=>setEditMode(!editMode)} icon={<EditIcon />} /> 
                        
                    }

                </div>
            }

            <div>

                <table>
                {
                    fields.map((field,index)=>(
                        <tr>
                            <td className={classes.td}>{field.title}</td>
                            <td>:</td>
                            {
                                editMode ? 

                                <td className={classes.tdedit}>


                                    {
                                        field.search ?

                                        <SearchComp2 defaultValue={value[field.name]} handleChange={handleChange}/>

                                        :
                                    
                                
                                        <EditComp 
                                            name={field.name}
                                            defaultValue={value[field.name]}
                                            optionValue={field.optionValue}
                                            type={field.type}
                                            options={field.options}
                                            handleChange={handleChange}
                                            error={hasError(field.name) ? error.errors[field.name][0] : ''}
                                        />
                                    }
                                    
                                    
                                </td>
                                :
                                <td className={classes.td}>{value[field.name]}</td>
                            }
                        
                        </tr>
                    ))
                }
                </table>
            </div>
            
            
        </div>
    )
}

