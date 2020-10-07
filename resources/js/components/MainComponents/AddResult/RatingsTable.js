import React,{useState, useEffect} from 'react'
import { Grid,makeStyles } from '@material-ui/core'
import Mtable from '@customComponent/Mtable'
import { MTableToolbar } from 'material-table';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { editableRatingsTableColumns } from '../../CData/table';
import { addRating,deleteRating } from '../../Redux/Ducks/MatchRatingsDuck';
import useTableActions from '@customComponent/useTableActions';

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

export default function RatingsTable({players,club,team,ratings,initRatings,fixture_id,updateMode,editable}){

    const dispatch = useDispatch();

    const columns = editableRatingsTableColumns(players);

    const tabelActions = {
        add:addRating,
        delete:deleteRating,
    }

    const {handleAddRow,handleDeleteRow} = useTableActions(tabelActions)

    const handleAdd = (newData) => {

        const data = {
            ...newData,
            club_id:club.id,
            fixture_id
        }
        return handleAddRow(data)
    } 


    const classes  = useStyles();

    return(

        <Mtable 
            columns={columns}
            data={ratings}
            search={false}
            title={`${club.name} RATINGS`}
            editable={editable}
            handleAddRow={handleAdd}
            handleDeleteRow={(oldData)=>handleDeleteRow(oldData.id)}
            header={{padding:'8px'}}
            // edit={true}
            sorting={false}
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

