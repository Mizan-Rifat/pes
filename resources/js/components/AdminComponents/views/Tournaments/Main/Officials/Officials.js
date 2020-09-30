import React,{useState,useEffect} from 'react';
import MaterialTable from 'material-table';
import {MenuItem,FormControl,TextField,Select,makeStyles, Button,Input, Tooltip,IconButton} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SelectComp from '@customComponent/SelectComp';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOfficials, addOfficial, removeOfficial} from '../../../../../Redux/Ducks/OfficialsDuck';
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

    const {officials,loading,fetching} = useSelector(state=>state.officials)
    const {tournamentInfo} = useSelector(state=> state.tournament)
    const dispatch = useDispatch();

    const tabelActions = {
        add:addOfficial,
        delete:removeOfficial,
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
            field:'name',
            editComponent: props => <SearchComp searchurl='/api/user/search' props={props} />
           
        },
  
    ])

    const handleAdd = (newData) => {

        console.log({newData})
        const data = {
            user_id:newData.name,
            tournament_id:tournamentInfo.id
        }

        return handleAddRow(data);
    }
    const handleDelete = (oldData) => {
     
        const data = {
            user_id:oldData.id,
            tournament_id:tournamentInfo.id
        }

        return handleDeleteRow(data)
    }

    useEffect(()=>{
        setTitle('Officials')
        
        if(officials.length === 0){
            dispatch(fetchOfficials(tournamentInfo.id))    
        }
    },[])
    return (
        
        <Mtable 
            columns={columns}
            data={officials}
            loading={loading || fetching }
            handleAddRow={handleAdd}
            handleDeleteRow={handleDelete}
            editable={true}
            paging={true}
            
        />
    )
}
