import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core';
import DetailTable from './DetailTable';
import { useDispatch } from 'react-redux';
import { deleteEvent, addEvent } from '@actions/resultActions';
import Notify from '@customComponent/Notify';


const useStyles=makeStyles(theme=>({
    toolbar:{
        padding:'5px 10px',
        display:'flex',
        justifyContent:'space-between'
    }
}))

export default function EventPanel({fixture_id,events,team,club_id,players}) {
    const classes = useStyles();

    const dispatch =useDispatch();

    const [editMode, setEditMode] = useState(false)

    const playerLookup = (players) =>{
        const obj = {};
        players.map(player=>{
            obj[player.id] = player.name
        })
        return obj;
    }


    const [columns,setColumns] = useState([
        {
            title:'Event',
            field:'event_id',
            lookup:{
                1:'Goal',
                2:'YC',
                3:'RC'
            },

            cellStyle:{
                padding:'5px',
                fontSize:'12px',
                // textAlign:'center'
            },
            width:'50px',
        },
        {
            title:'Player',
            field:'player_id',
            // field:'player.name',
            lookup:playerLookup(players),
            cellStyle:{
                padding:'5px',
                fontSize:'12px',
                // textAlign:'center'
            }
        },
        {
            title:'Min',
            field:'minute',
            cellStyle:{
                padding:'5px',
                fontSize:'12px',
                // textAlign:'center'
            },
            // width:'50px',
        },
        {
            title:'Assisted',
            field:'assist_player_id',
            lookup:{
                0:'None',
                ...playerLookup(players)
            },
            cellStyle:{
                padding:'5px',
                fontSize:'12px',
                // textAlign:'center'
                
            }
        },
    ])

    


    const toast = Notify();


    const handleDeleteRow = (oldData) => (
        new Promise((resolve,reject)=>{
            dispatch(deleteEvent(oldData.id,`${team.toLowerCase()}_events`))
            .then(response=>{
                toast(response,'success')
                resolve()
            })
            .catch(error=>{
                Object.keys(error).map(err=>{
                    toast(error[err],'error')
                })
                reject();
            })
        })
    ) 
    const handleAddRow = (newData) => (

        new Promise((resolve,reject)=>{
            dispatch(addEvent({...newData,fixture_id,club_id},`${team.toLowerCase()}_events`))
            .then(response=>{
                toast(response,'success')
                resolve()
            })
            .catch(error=>{
                Object.keys(error).map(err=>{
                    toast(error[err],'error')
                })
                reject();
            })
        })

    ) 

    

    return (
        <div >
            
            <DetailTable 
                team={team}
                table={'Events'}
                columns={columns}
                data={events}
                editMode={editMode}
                handleDeleteRow={handleDeleteRow}
                handleAddRow={handleAddRow}
            />
        </div>

    )
}
