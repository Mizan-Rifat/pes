import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import {useSelector,useDispatch} from 'react-redux';
import Notify from '@customComponent/Notify';
import CompContainer from '@customComponent/CompContainer';
import Mtable from '@customComponent/Mtable';

import { fetchAllTournaments, createNewTournament, deleteTournaments } from '@actions/tournamentsAction';

const useStyles =makeStyles(theme=>({
    container:{
        padding:'10px'
    }
}));

export default function AllTournaments() {
    const classes = useStyles();

    const toast = Notify();


    const {tournaments,loading,error,success} = useSelector(state => state.tournaments);
    const dispatch = useDispatch()

    const [columns, setColumns] = useState([
        {
            title:'ID',
            field:'id',
            width:'50px',
            headerStyle: {
                padding:'16px 10px',
                textAlign:'center'
            },
            editable: 'never'
        },
        {
            title:'Name',
            field:'name',

        },
        {
            title:'Slug',
            field:'slug',

        },
        {
            title:'Format',
            field:'format',
            lookup:{
                1:'Round Robin League',
                2:'Knockout',
                3:'Double Stage',
            }

        },
        {
            title:'Rounds',
            field:'rounds',
        },
        {
            title:'Leg',
            field:'leg',
            lookup:{
                1:1,
                2:2,
            }
        },
        {
            title:'Clubs',
            field:'clubs_count',
            editable: 'never'
        },
        {
            title:'Active',
            field:'active',
            lookup:{
                0:'No',
                1:'Yes',
            }
        },
    ]);

    const handleAddRow = (newData) => (

        new Promise((resolve,reject)=>{

          
            dispatch(createNewTournament(newData))
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
                                
            dispatch(deleteTournaments([oldData.id]))
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
 

    return (
    
        <CompContainer title='Clubs'>
        

            <Mtable 
                columns={columns}
                data={tournaments}
                loading={loading}
                paging={true}
                handleAddRow={handleAddRow}
                handleDeleteRow={handleDeleteRow}
                editable={true}
               
                
            />
          
        
        </CompContainer>
    )
}
