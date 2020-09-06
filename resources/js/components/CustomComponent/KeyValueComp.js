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

export default function KeyValueComp({fields,value,saveAction,editMode,setEditMode}) {
  
    const classes = useStyles();

    const dispatch = useDispatch();

    const toast = Notify();


    const [formData, setFormData] = useState({})

    const handleChange = (label,value) => {
        setFormData({
            ...formData,
            [label]:value
        })
    }

    const handleSave = () => {
        dispatch(saveAction(formData))
        .then(response=>{
            toast(response,'success')
            setEditMode(false)
        })
        .catch(error=>{
            console.log('hs',error)
        })

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

                                        <SearchComp2 handleChange={handleChange}/>

                                        :
                                    
                                
                                        <EditComp 
                                            name={field.name}
                                            defaultValue={value[field.name]}
                                            optionValue={field.optionValue}
                                            type={field.type}
                                            options={field.options}
                                            handleChange={handleChange}
                                            // error={''}
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

function ChooseLogo(){

    const logos = [
        "http://127.0.0.1:8000/images/teams/e_000001_r_l.png",
        "http://127.0.0.1:8000/images/teams/e_000002_r_l.png",
        "http://127.0.0.1:8000/images/teams/e_000003_r_l.png",
        "http://127.0.0.1:8000/images/teams/e_000004_r_l.png",
        "http://127.0.0.1:8000/images/teams/e_000005_r_l.png",
        "http://127.0.0.1:8000/images/teams/e_000006_r_l.png",
        "http://127.0.0.1:8000/images/teams/e_000007_r_l.png",
        "http://127.0.0.1:8000/images/teams/e_000008_r_l.png",
        "http://127.0.0.1:8000/images/teams/e_000009_r_l.png",
        "http://127.0.0.1:8000/images/teams/e_000010_r_l.png",
        "http://127.0.0.1:8000/images/teams/e_000011_r_l.png",
        "http://127.0.0.1:8000/images/teams/e_000012_r_l.png",
        "http://127.0.0.1:8000/images/teams/e_000013_r_l.png",
        "http://127.0.0.1:8000/images/teams/e_000014_r_l.png",
        "http://127.0.0.1:8000/images/teams/e_000015_r_l.png",
        "http://127.0.0.1:8000/images/teams/e_000016_r_l.png",
        "http://127.0.0.1:8000/images/teams/e_000017_r_l.png",
        "http://127.0.0.1:8000/images/teams/e_000019_r_l.png",
        "http://127.0.0.1:8000/images/teams/e_000020_r_l.png",
        "http://127.0.0.1:8000/images/teams/e_000021_r_l.png"
        ]

    return(
        <Grid conaiter spacing={3}>

            {
                logos.map((logo,index)=>(
                    <Grid item xs={6}>
                        <img src={logo} key={index} style={{height:'100px',width:'100px'}} />
                    </Grid>
                ))
            }
            
        </Grid>
    )
}