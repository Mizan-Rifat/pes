import React,{useState} from 'react';
import Mtable from '@customComponent/Mtable';
import {makeStyles, TextField} from '@material-ui/core';
import { MTableToolbar } from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import Notify from '@customComponent/Notify';
import useTableActions from '@customComponent/useTableActions';
import { editableEventsTableColumns } from '../../CData/table';
import { eventAdded,eventDeleted,addEvent,deleteEvent } from '../../Redux/Ducks/MatchEventsDuck';

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
        padding:'5px 0 !important',
        minHeight:'unset'
        
    },
}))

export default function EventTable({players,club,events,loading,fixture_id,editable}) {

    const classes  = useStyles();

    const dispatch = useDispatch();

    const toast = Notify();

    const columns = editableEventsTableColumns(players);

    const tabelActions = {
        add:addEvent,
        delete:deleteEvent,
    }

    const {handleAddRow,handleDeleteRow} = useTableActions(tabelActions)

    const handleAdd = (newData) => {
        const data = {
            ...newData,
            club_id:club.id,
            fixture_id,
            assist_player_id:newData.hasOwnProperty('assist_player_id') ? newData.assist_player_id : null 
        }

        return handleAddRow(data)
    } 

    return (
            <Mtable 
                columns={columns}
                data={events}
                editable={editable}
                handleAddRow={handleAdd}
                handleDeleteRow={(oldData)=>handleDeleteRow(oldData.id)}
                // edit={!loading}
                addLast={true}
                title={`${club.name} EVENTS`}
                header={{padding:'8px'}}
                search={false}
                toolbarLess={true}
               
            />
    )
}
