import React,{useState} from 'react';
import Mtable from '@customComponent/Mtable';
import {makeStyles, TextField} from '@material-ui/core';
import { MTableToolbar } from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { removeEventFromState, addTeam1EventToState, addTeam2EventToState, addEventToState, deleteEvent, addEvent } from '../../Redux/actions/resultAddAction';
import Notify from '@customComponent/Notify';
import { editableEventsTableColumns } from '../../CData/table';

const useStyles = makeStyles(theme=>({
    container:{
        // boxShadow:'0 6px 12px rgba(0,0,0,.1)',
        marginTop:'30px',
    },
    listItemContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    toolbar:{
        padding:'0 !important',
        minHeight:'unset'
        
    },
}))

export default function EventTable({players,club_id,events,loading,fixture_id,eventKey,updateMode,editable}) {

    const classes  = useStyles();

    const dispatch = useDispatch();

    const toast = Notify();

    const columns = editableEventsTableColumns(players);

    const handleAddRow = (newData) => (

        new Promise((resolve,reject)=>{

            console.log({newData})

            if( !newData.hasOwnProperty('event_id')){
                toast('Event field is required.','error')
             
                return reject();
            }
            
            if( !newData.hasOwnProperty('player_id')){
                toast('player field is required.','error')
              
                return reject()
            }
            
            if( !newData.hasOwnProperty('minute')){
                toast('Minute field is required.','error')
             
                return reject()
            }
            if( !Number.isInteger(parseInt(newData.minute))){
                toast('Invalid Minute','error')
             
                return reject()
            }

            const data = {
                ...newData,
                id:eventKey,
                club_id,
                fixture_id,
                assist_player_id:newData.hasOwnProperty('assist_player_id') ? newData.assist_player_id : null 
            }

            if(updateMode){
                dispatch(addEvent(data))
                .then(response=>{
                    toast(response,'success')
                })
                .catch(error=>{
                    Object.keys(error.errors).map(err=>{
                        toast(error.errors[err],'error')
                    })
                    return reject();
                })    
            }else{
                dispatch(addEventToState(data))
            }
            
            resolve()
         
        })

    ) 
    const handleDeleteRow = (oldData) => (

        new Promise((resolve,reject)=>{
            if(updateMode){
                dispatch(deleteEvent({id:oldData.id}))
                .then(response=>{
                    toast(response,'success')
                })
                .catch(err=>{
                    toast(err,'error')
                })    
            }else{
                dispatch(removeEventFromState(oldData.id))
            }
            
            resolve()
        })

    ) 

    return (
        <Mtable 
                columns={columns}
                // loading={loading}
                data={events}
                handleAddRow={ editable ? handleAddRow : false}
                handleDeleteRow={editable ? handleDeleteRow : false}
                edit={!loading}
                addLast={true}
                title='Events'
                header={{padding:'8px'}}
                search={false}
                components={{
                    Toolbar: props => (
    
                      <div className='detailTable'>
                          <MTableToolbar {...props} classes={{root:classes.toolbar}} />
                      </div>
                      
                    ),
                  }}
            />
    )
}
