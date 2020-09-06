import React, { useState,useEffect } from 'react';
import {MenuItem,FormControl,TextField,Button,makeStyles, IconButton,Tooltip} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector, useDispatch } from 'react-redux';
import EditComp from '@customComponent/EditComp';
import { updateTournamentInfo } from '@actions/infoAction';
import Notify from '@customComponent/Notify';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import MIconButton from '../../../../../CustomComponent/MIconButton';

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

export default function Info({setTitle}) {
  
    const classes = useStyles();

    const [editMode, setEditMode] = useState(false);

    
    const {tournament,loading} = useSelector(state=>state.info)
    const dispatch = useDispatch();

    const toast = Notify();


    const [formData, setFormData] = useState({
        id:'',
        name:'',
        slug:'',
        format:'',
        rounds:'',
        leg:'',
        active:''
    })

    const [formatOptions, setFormatOptions] = useState([
        {
            label:'Round Robin League',
            value:1
        },
        {
            label:'Knockout',
            value:2 
        },
        {
            label:'Double Stage',
            value:3
        },
    ]);




    const [fields, setFields] = useState([])

    const handleChange = (label,value) => {
        setFormData({
            ...formData,
            [label]:value
        })
    }

    const handleSave = () => {
        dispatch(updateTournamentInfo(formData))
        .then(response=>{
            toast(response,'success')
            setEditMode(false)
        })
        .catch(error=>{
            Object.keys(error).map(err=>{
                toast(error[err],'error')
            })
        })

    }
    

    
    useEffect(()=>{
        // setTitle('Info')
        setFormData({
            ...formData,
            id:tournament.id,
            name:tournament.name,
            slug:tournament.slug,
            format:tournament.format,
            rounds:tournament.rounds,
            leg:tournament.leg,
            active:tournament.active
        })
    },[])

    useEffect(() => {
        setFields([
            {
                title:'Name',
                name:'name',
                value:tournament.name,
                optionValue:'',
                type:'input',
                options:[]
            },
            {
                title:'Slug',
                name:'slug',
                value:tournament.slug,
                optionValue:'',
                type:'input',
                options:[]
            },
            {
                title:'Format',
                name:'format',
                value:'dsf',
                // value:formatOptions[tournament.format - 1].label,
                optionValue:tournament.format,
                type:'select',
                options:formatOptions
            },
            {
                title:'Rounds',
                name:'rounds',
                value:tournament.rounds,
                optionValue:'',
                type:'input',
                options:[]
            },
            {
                title:'Leg',
                name:'leg',
                value:tournament.leg,
                optionValue:tournament.leg,
                type:'select',
                options:[
                    {
                        label:1,
                        value:1 
                    },
                    {
                        label:2,
                        value:2
                    },
                ]
            },
            {
                title:'Active',
                name:'active',
                value:tournament.active ? 'True' : 'False',
                optionValue:tournament.active,
                type:'select',
                options:[
                    {
                        label:'True',
                        value:1 
                    },
                    {
                        label:'False',
                        value:0
                    },
                ]
            },
        ])
    }, [tournament])

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

            <table>
               {
                   fields.map((field,index)=>(
                    <tr>
                        <td className={classes.td}>{field.title}</td>
                        <td>:</td>
                        {
                            editMode ? 
                            <td className={classes.tdedit}>
                            
                                <EditComp 
                                    name={field.name}
                                    defaultValue={field.value}
                                    optionValue={field.optionValue}
                                    type={field.type}
                                    options={field.options}
                                    handleChange={handleChange}
                                />
                                
                            </td>
                            :
                            <td className={classes.td}>{field.value}</td>
                        }
                    
                    </tr>
                   ))
               }
            </table>
            
            
        </div>
    )
}
