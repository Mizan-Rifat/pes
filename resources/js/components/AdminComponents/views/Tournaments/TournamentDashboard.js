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
import { fetchTournaments } from '@actions/tournamentsAction';

const useStyles =makeStyles(theme=>({
    container:{
        padding:'10px'
    }
}));

export default function TournamentDashboard() {
    const classes = useStyles();

    const toast = Notify();

    const {tournaments,loading,error,success} = useSelector(state => state.tournaments);
    const dispatch = useDispatch()

    const [editMode, setEditMode] = useState(false)
    const [saveDialogOpen, setSaveDialogOpen] = useState(false)


    const [bolOptions] = useState([
        {
            label:'Yes',
            value:true
        },
        {
            label:'NO',
            value:false
        },
    ]) 

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
            editComponent: props => <SelectComp 
                                        type={'input'}
                                        defaultValue={props.rowData.name} 
                                        props={props}
                                    />
        },
        {
            title:'Type',
            field:'name',
            editComponent: props => <SelectComp 
                                        type={'input'}
                                        defaultValue={props.rowData.name} 
                                        props={props}
                                    />
        },
        {
            title:'Active',
            field:'active',
            render: rowData => rowData.active ? 'Yes' : 'No',
            editComponent: props => <SelectComp 
                                        type={'select'}
                                        defaultValue={props.rowData.active} 
                                        props={props}
                                        options={bolOptions}
                                    />
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
  

    const handleEditMode = ()=>{
        if(editMode){
            tournaments.forEach(d => {if(d.tableData)d.tableData.checked = false})
        }
        setEditMode(!editMode)
    }


    useEffect(()=>{
        dispatch(fetchTournaments());
    },[])

 

    return (
    
        <CompContainer title='All tournaments'>
        

            <div className='text-right'>
                <Tooltip title='Edit'>
                    <IconButton aria-label="edit" onClick={handleEditMode}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>

            </div>

            <MaterialTable
                style={{ boxShadow: 'unset',background:'unset' }}
                isLoading={loading}
                title=''
                columns={columns}
                data={tournaments}        
                options={{
                    search:true,
                    actionsColumnIndex: -1,
                    headerStyle: { backgroundColor: '#F1CB29', fontWeight: 'bold' },
                    pageSize:10,
                    selection: editMode
                    
                }}
                actions={[
                    {
                      tooltip: 'Remove Selected',
                      icon: 'delete',
                      onClick: (event, data) => handleRemoveSelected(data.map(item=>item.id)),
                      position:'toolbarOnSelect'
                      
                    },
                  ]}
                editable={ editMode ? {
                 
                    onRowUpdate: (newData, oldData) => {

                        return new Promise((resolve,reject)=>{
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
                        
                    },
                    onRowDelete: oldData =>
                      new Promise((resolve, reject) => {
                          
                        dispatch(deleteUser([oldData.id]))
                        .then(response=>{
                            toast(response,'success')
                            resolve()
                        }).catch(error=>{
                            toast(error,'error')
                            resolve()
                        })

                      }),
                  }
                  :
                  false
                
                }
                
            
            />
        
        </CompContainer>
    )
}
