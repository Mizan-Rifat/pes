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

import {fetchAllUsers, updateUser,deleteUser,blockUser} from '../../actions/usersActions';

import Notify from '@customComponent/Notify';
import CompContainer from '../../../customComponent/CompContainer';

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
            title:'Email Verified',
            field:'email_verified',
            render: rowData => rowData.email_verified ? 'Yes' : 'No',
            editable: 'never'
            
        },
        {
            title:'Email',
            field:'email',
            editComponent: props => <SelectComp 
                                        type={'input'}
                                        defaultValue={props.rowData.email} 
                                        props={props}
                                    />
            
        
        },
        {
            title:'Club',
            field:'club.name',
            editable: 'never'
        },
        {
            title:'Blocked',
            field:'blocked',
            render: rowData => rowData.blocked ? 'Yes' : 'No',
            editComponent: props => <SelectComp 
                                        type={'select'}
                                        defaultValue={props.rowData.blocked} 
                                        props={props}
                                        options={bolOptions}
                                    />
        },

    ])


    // const [data, setData] = useState([
    //     {
    //         "id": 1,
    //         "name": "Mizan",
    //         "email": "mizan@mail.com",
    //         "email_verified": true,
    //         "club": {
    //         "id": 1,
    //         "name": "FC RED RANGERS",
    //         "slug": "fcredrangers",
    //         "logo": "fcb_logo_PNG19.png",
    //         },
    //         blocked:false
    //         },
    //         {
    //         "id": 2,
    //         "name": "Prof. Prudence Quitzon",
    //         "email": "doconnell@example.org",
    //         "email_verified": true,
    //         "club": {
    //         "id": 2,
    //         "name": "FC BARCELONA",
    //         "slug": "fcbarcelona",
    //         "logo": "fcb_logo_PNG19.png"
    //         },
    //         blocked:false
    //         },
    //         {
    //         "id": 3,
    //         "name": "Miss Christiana Crona",
    //         "email": "vdicki@example.net",
    //         "email_verified": true,
    //         "club": {
    //         "id": 3,
    //         "name": "REAL MADRID",
    //         "slug": "realmadrid",
    //         "logo": "realmadrid-logo.png"
    //         },
    //         blocked:false
    //         },
    //         {
    //         "id": 4,
    //         "name": "Dr. Randi Torphy III",
    //         "email": "rosemary.hills@example.com",
    //         "email_verified": true,
    //         "club": {
    //         "id": 4,
    //         "name": "Valencia",
    //         "slug": "valencia",
    //         "logo": "fcb_logo_PNG19.png"
    //         },
    //         blocked:false
    //         },
    //         {
    //         "id": 5,
    //         "name": "Wendell Davis III",
    //         "email": "jacobson.kaylah@example.com",
    //         "email_verified": true,
    //         "club": {
    //         "id": 5,
    //         "name": "Atletico Madrid",
    //         "slug": "atleticomadrid",
    //         "logo": "mulogo.png"
    //         },
    //         blocked:false
    //         },
    //         {
    //             "id": 41,
    //             "name": "New User",
    //             "email": "newuser@mail.com",
    //             "email_verified": false,
    //             "club": null,
    //             blocked:false
    //             }
    // ])
    
    

    const handleSave = ()=>{
        setSaveDialogOpen(!saveDialogOpen)

    }

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

    const handleEditMode = ()=>{
        if(editMode){
            users.forEach(d => {if(d.tableData)d.tableData.checked = false})
        }
        setEditMode(!editMode)
    }


    useEffect(()=>{
        dispatch(fetchAllUsers());
    },[])

 

    return (
    
        <CompContainer title='Users'>
        

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
                data={users}        
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
