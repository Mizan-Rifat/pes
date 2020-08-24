import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import MaterialTable from 'material-table'
import AlertDialog from '@customComponent/AlertDialog';
import {useSelector,useDispatch} from 'react-redux';
import SelectComp from '@customComponent/SelectComp'
import {Input} from '@material-ui/core';

import {fetchAllUsers, updateUser,deleteUser,blockUser} from '@actions/usersActions';

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

    const {users,loading,error,success} = useSelector(state => state.users);
    const dispatch = useDispatch()

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
                true:'Yes',
                false:'No'
            },
        },

    ])
    

    const handleRemoveSelected = (ids)=>{

        const confirm = window.confirm('Are You Sure To Delete Selected?')

        if(confirm){
            dispatch(deleteUser(ids))
            .then(response=>{
                toast(response,'success')
            }).catch(error=>{
                toast(error,'error')
            })
        }

    }
    const handleBlockSelected = (ids)=>{

        dispatch(blockUser(ids))
        .then(response=>{
            toast(response,'success')
        }).catch(error=>{
            toast(error,'error')
        })

    }



    const handleUpdateRow = (newData) => (

        new Promise((resolve,reject)=>{
            dispatch(updateUser(newData))
            .then(response=>{
                toast(response,'success')
                resolve();
            }).catch(error=>{
                Object.entries(error).map(err=>{
                    console.log({err})
                    toast(error[err[0]][0],'error')
                })
                reject();
            })
        })
    )


    const handleDeleteRow = (oldData) => (
        new Promise((resolve, reject) => {
                          
            dispatch(deleteUser([oldData.id]))
            .then(response=>{
                toast(response,'success')
                resolve()
            }).catch(error=>{
                toast(error,'error')
                resolve()
            })

          })
    )


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
                loading={loading}
                handleUpdateRow={handleUpdateRow}
                handleDeleteRow={handleDeleteRow}
                paging={true}
                selectMode={true}
                actions={[
                    {
                      tooltip: 'Remove Selected',
                      icon: 'delete',
                      onClick: (event, data) => handleRemoveSelected(data.map(item=>item.id)),
                      position:'toolbarOnSelect'
                      
                    },
                    {
                        icon: 'message',
                        tooltip: 'Send Message',
                        onClick: (event, data) => console.log(data),
                        position:'toolbarOnSelect'
                        
                        
                    },
                    {
                        icon: 'block',
                        tooltip: 'Block/Unblock Selected',
                        onClick: (event, data) => handleBlockSelected(data.map(item=>item.id)),
                        position:'toolbarOnSelect',
                        
                    },
                  ]}
            
            />
        
        </CompContainer>
    )
}
