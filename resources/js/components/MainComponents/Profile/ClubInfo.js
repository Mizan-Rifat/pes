import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import KeyValueComp from '../../CustomComponent/KeyValueComp';
import {Link} from 'react-router-dom';
import { Button } from '@material-ui/core';
import { updateClubInfo, createClub } from '../../Redux/actions/clubsAction';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    container:{
        padding:'20px 150px',
        height:500,
        [theme.breakpoints.down('sm')]:{
          padding:'20px'  
        },
        [theme.breakpoints.down('xs')]:{
          padding:'10px'  
        }
    },
    toolbar:{
        padding:'0 !important',
        minHeight:'unset'
        
    },
    link:{
        fontSize:'12px',
        padding:'14px'
    },
    wrapper:{
        padding:20,
        [theme.breakpoints.down('xs')]:{
            padding:'10px'  
          }
    },
    wrapper2:{
        textAlign:'center',
        margin:'50px'
    },
    tabHeader:{
        boxShadow:'unset',
        background:'unset'
    }

}))

export default function ClubInfo({user}) {
    const classes = useStyles();
    const [editMode,setEditMode] = useState(false)
    const [createMode,setCreateMode] = useState(false)

    

    const [fields, setFields] = useState([
        {
            title:'Club Name',
            name:'name',
            optionValue:'',
            type:'input',
            options:[]
        },
        {
            title:'Club Model',
            name:'club_model',
            optionValue:'',
            type:'input',
            search:true,
            options:[]
        },
        {
            title:'Owner Id',
            name:'owner_id',
            optionValue:'',
            type:'input',
            options:[]
        },
    ])

    const [value, setvalue] = useState(
        {}
    )
    const handleCreateMode = ()=>{
        setCreateMode(true)
        setEditMode(true)
    }


    useEffect(() => {

        if(user.club != null){
            setvalue({
                id:user.club.id,
                name:user.club.name,
                club_model:user.club.club_model,
                model_id:user.club.club_model_id,
                owner_id:user.club.owner_id
            })
        }
        
    }, [user])

    return (
        <>

            {
                user.club != null || createMode ?
            
                <div className={classes.wrapper}>
                    
                        <KeyValueComp 
                            fields={fields}
                            value={value}
                            initEditMode={false}
                            editMode={editMode}
                            setEditMode={setEditMode}
                            saveAction={createMode ? createClub : updateClubInfo}

                        />
                        
                    
                </div>

                :

                <div className={classes.wrapper2}>
                    <h5>You haven't created a club yet...</h5>
                    <Button variant='contained' color='primary' onClick={handleCreateMode}>Create A Club </Button>
                </div>

            }
          
        </>
    )
}
