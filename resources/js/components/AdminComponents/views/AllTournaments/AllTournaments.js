import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import {useSelector,useDispatch} from 'react-redux';
import Notify from '@customComponent/Notify';
import CompContainer from '@customComponent/CompContainer';
import Mtable from '@customComponent/Mtable';

import { createNewTournament, deleteTournament, updateTournament } from '../../../Redux/Ducks/TournamentsDuck';
import useTableActions from '../../../CustomComponent/useTableActions';

const useStyles =makeStyles(theme=>({
    container:{
        padding:'10px'
    }
}));

export default function AllTournaments() {
    const classes = useStyles();

    const toast = Notify();


    const {tournaments,loading} = useSelector(state => state.tournaments);
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

    const tabelActions = {
        add:createNewTournament,
        update:updateTournament,
        delete:deleteTournament,
    }

    const {handleAddRow,handleUpdateRow,handleDeleteRow} = useTableActions(tabelActions)


    return (
    
        <CompContainer title='Clubs'>
        

            <Mtable 
                columns={columns}
                data={tournaments}
                loading={loading}
                paging={true}
                handleAddRow={handleAddRow}
                handleUpdateRow={(newData)=>handleUpdateRow(newData)}
                handleDeleteRow={(oldData)=>handleDeleteRow(oldData.id)}
                editable={true}
               
                
            />
          
        
        </CompContainer>
    )
}
