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

export default function EditButton({currentMode,handleSave}) {

    const classes = useStyles();
    const [editMode, setEditMode] = useState();


    useEffect(()=>{
        currentMode(editMode)
    },[editMode])


    return (
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
    )
}
