import React,{useState,useEffect} from 'react';
import MaterialTable from 'material-table';
import {MenuItem,FormControl,TextField,Select,makeStyles, Button,Input, Tooltip,IconButton} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SelectComp from '@customComponent/SelectComp';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOfficials, addOfficials, deleteOfficials } from '@actions/officialsAction';
import UserSearch from './UserSearch';
import Notify from '@customComponent/Notify';
import SearchComp from '@customComponent/SearchComp';
import Mtable from '@customComponent/Mtable';
import useActions from '@customComponent/useActions';




const useStyles = makeStyles(theme=>({

    logo:{
        height:'100%',
        margin:'0 10px 0 0'
    },
    team:{
        height:'25px',
        display:'flex',
        alignItems:'center',
    },
    team2:{
        height:'25px',
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    result:{

        height:'25px',
        display:'flex',
    },
  }));
  
export default function Officials({setTitle}) {
    const classes = useStyles();

    const {officials,loading} = useSelector(state=>state.officials)
    const {id:tournament_id} = useSelector(state=>state.info.tournament)
    const dispatch = useDispatch();

    const toast = Notify();

    const [columns, setColumns] = useState([
        {
            title:'ID',
            field:'id',
            width:'50px',
            editable: 'never'
        },
        {
            title:'Official',
            field:'official.name',
            render:rowData => rowData.official.name,
            editComponent: props => <SearchComp searchurl='/api/users/search' props={props} />
           
        },
        {
            title:'Club',
            render : rowData => <Team team={rowData.official.club}/>,
        }
    ])


    const handleAddRow = (newData) => (

        new Promise((resolve,reject)=>{
            dispatch(addOfficials(newData.official.name,tournament_id))
            .then(response=>{
                toast(response,'success')
                resolve();
            }).catch(error=>{

                Object.keys(error).map(err=>{
                    toast(error[err],'error')
                })
                reject();
            })
        })

    )


    const handleDeleteRow = (oldData) => (
        new Promise((resolve, reject) => {
                                
            dispatch(deleteOfficials([oldData.id]))
            .then(response=>{
                toast(response,'success')
                resolve()
            }).catch(error=>{
                Object.keys(error).map(err=>{
                    toast(error[err],'error')
                })
                resolve();
            })

        })
    )


    useEffect(()=>{
        setTitle('Officials')
        
        if(officials.length === 0){
            dispatch(fetchOfficials(tournament_id))    
        }
    },[])
    return (
        
        <Mtable 
            columns={columns}
            data={officials}
            loading={loading}
            handleAddRow={handleAddRow}
            handleDeleteRow={handleDeleteRow}
            
        />
    )
}
function Team({team}){
    
    const classes = useStyles();
    return(
        
        team === null ? '' : 
        <div className={classes.team}>
            <img src={`http://127.0.0.1:8000/images/logo/${team.logo}`} className={classes.logo}/>
            <div>{team.name}</div>   
        </div>
    )
}