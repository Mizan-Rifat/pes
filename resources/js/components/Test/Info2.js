import React, { useState,useEffect } from 'react';
import {MenuItem,FormControl,TextField,Button,makeStyles, IconButton,Tooltip} from '@material-ui/core';
import SelectComp from '@customComponent/SelectComp';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector, useDispatch } from 'react-redux';


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


    const [formData, setFormData] = useState({
        name:'',
        
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

    const {tournament,loading} = useSelector(state=>state.info)
    const dispatch = useDispatch();


    const [fields, setFields] = useState([
        {
            title:'Name',
            value:tournament.name,
            optionValue:'',
            editComp:'input',
            options:[]
        },
        {
            title:'Format',
            value:formatOptions[tournament.type - 1].label,
            optionValue:tournament.type,
            editComp:'select',
            options:formatOptions
        },
        {
            title:'Rounds',
            value:tournament.round,
            optionValue:'',
            editComp:'input',
            options:[]
        },
        {
            title:'Leg',
            value:tournament.leg,
            optionValue:tournament.leg,
            editComp:'select',
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
            value:tournament.active ? 'True' : 'False',
            optionValue:tournament.active,
            editComp:'select',
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
    

    
    useEffect(()=>{
        setTitle('Info')
    },[])

    return (
        <div>
            <div className='text-right'>
             
                <Tooltip title='Edit'>
                    <IconButton aria-label="edit" onClick={()=>setEditMode(!editMode)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>  

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
                            
                                <SelectComp 
                                    type={field.editComp}
                                    rowData={false}
                                    field={ field.editComp === 'select' ? field.optionValue : field.value}
                                    options={field.options}
                                />
                                
                            </td>
                            :
                            <td className={classes.td}>{field.value}</td>
                        }
                    
                    </tr>
                   ))
               }
            </table>
            
            {
                editMode &&

                    <div style={{margin:'15px'}}>
                            <Button variant='contained' color='primary' className={classes.savebtn} onClick={handleSave}>
                                Save
                            </Button>
                    </div>

            }
            
        </div>
    )
}
