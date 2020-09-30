import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import {useSelector,useDispatch} from 'react-redux';
import useTableActions from '../../../CustomComponent/useTableActions';
import {fetchAllUsers, updateUser,deleteUser} from '../../../Redux/Ducks/UsersDuck';

import Notify from '@customComponent/Notify';
import CompContainer from '@customComponent/CompContainer';
import Mtable from '@customComponent/Mtable';

const useStyles =makeStyles(theme=>({
    container:{
        padding:'10px'
    }
}));

export default function Users() {
    const classes = useStyles();

    const toast = Notify();

    const {users,loading,fetching} = useSelector(state => state.users);
    const dispatch = useDispatch()

    const tabelActions = {
        update:updateUser,
        delete:deleteUser,
    }

    const {handleUpdateRow,handleDeleteRow} = useTableActions(tabelActions)

    const [columns, setcolumns] = useState([
        {
            title:'ID',
            field:'id',
            width:'50px',
            editable: 'never'
        },
        {
            title:'Name',
            field:'name',
        },
        {
            title:'Email Verified',
            field:'email_verified',
            lookup:{
                true:'Yes',
                false:'No'
            },
            editable: 'never'
            
        },
        {
            title:'Email',
            field:'email',
        
        },
        {
            title:'Club',
            field:'club.name',
            editable: 'never'
        },
        {
            title:'Blocked',
            field:'blocked',
            lookup:{
                1:'Yes',
                0:'No'
            },
        },

    ])


    useEffect(()=>{
        if(users.length === 0){
            dispatch(fetchAllUsers());
        }
    },[])

 

    return (
    
        <CompContainer title='Users'>
            <Mtable 
                columns={columns}
                data={users}
                loading={loading || fetching}
                handleUpdateRow={(newData)=>handleUpdateRow(newData)}
                handleDeleteRow={(oldData)=>handleDeleteRow(oldData.id)}
                paging={true}
                editable={true}
            
            />
        
        </CompContainer>
    )
}
