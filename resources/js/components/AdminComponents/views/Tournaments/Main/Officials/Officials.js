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
import useTableActions from '../../../../../CustomComponent/useTableActions';




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

    const tabelActions = {
        add:addOfficials,
        delete:deleteOfficials,
    }

    const {handleAddRow,handleDeleteRow} = useTableActions(tabelActions)

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
            field:'user_name',
            editComponent: props => <SearchComp searchurl='/api/users/search' props={props} />
           
        },
  
    ])

    const handleAdd = (newData) => handleAddRow({
        user_id:newData.user_name,
        tournament_id:tournament_id
    })

    const handleDelete = (oldData) => handleDeleteRow({ids:[oldData.id]})


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
            handleAddRow={handleAdd}
            handleDeleteRow={handleDelete}
            editable={true}
            paging={true}
            
        />
    )
}
