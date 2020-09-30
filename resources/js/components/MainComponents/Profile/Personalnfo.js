import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import KeyValueComp from '../../CustomComponent/KeyValueComp';
import EditButton from '../../CustomComponent/EditButton';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateSessionUser } from '../../Redux/Ducks/SessionUserDuck';

const useStyles = makeStyles((theme) => ({
    container:{
        padding:'20px 150px',
        minHeight:500,
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
    tabHeader:{
        boxShadow:'unset',
        background:'unset'
    }

}))

export default function PersonalInfo() {
    const classes = useStyles();

    const {user} = useSelector(state => state.sessionUser)

    const [passCM, setPassCM] = useState(false)
    const [editMode,setEditMode] = useState(false)

    const initFields = [
        {
            title:'Username',
            name:'name',
            optionValue:'',
            type:'input',
            options:[]
        },
        {
            title:'Email',
            name:'email',
            optionValue:'',
            type:'input',
            options:[]
        },
        {
            title:'Facebook Id',
            name:'fbID',
            optionValue:'',
            type:'input',
            options:[]
        },
    ]

    const initValue = {
            id:user.id,
            name:user.name,
            email:user.email,
            fbID:user.fbID
        }
    
    const passFields =[
        {
            title:'Old Password',
            name:'old_password',
            optionValue:'',
            type:'input',
            options:[]
        },
        {
            title:'New Password',
            name:'password',
            optionValue:'',
            type:'password',
            options:[]
        },
        {
            title:'Confirm Password',
            name:'password_confirmation',
            optionValue:'',
            type:'password',
            options:[]
        },
    ]

    const passValue = {
            old_password:'',
            password:'',
            password_confirmation:''
        }


    const [fields, setFields] = useState([])
    const [value, setvalue] = useState([])



    useEffect(() => {
        if(editMode && passCM){
            setFields([
                ...initFields,
                ...passFields
            ])
            setvalue({
                ...initValue,
                ...passValue
            })
        }else{
            setFields(initFields)
            setvalue(initValue)
        }

    }, [passCM,editMode])

    return (
        <>
                    <div className={classes.wrapper}>

                        
                            <KeyValueComp 
                                fields={fields}
                                value={value}
                                saveAction={updateSessionUser}
                                editMode={editMode}
                                editable={true}
                                setEditMode={setEditMode}

                            />
                            {
                                editMode && !passCM ? 
                            
                                <Link onClick={()=>setPassCM(true)}className={classes.link}>Change Password</Link>

                                : ''
                            }
                    </div>
            {/* } */}
        </>
    )
}
