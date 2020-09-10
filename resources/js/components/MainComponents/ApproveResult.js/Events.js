import React,{useState} from 'react'
import { Grid,makeStyles } from '@material-ui/core'
import { ListGroupItem1,ListGroupItem2 } from '@customComponent/ListGroupItem'
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import { FootballIcon,RedCardIcon,AssistIcon,YellowCardIcon } from '@customComponent/Icons';
import useTableActions from '@customComponent/useTableActions';
import Mtable from '@customComponent/Mtable';
import { eventsTableColumns } from '../../CData/table';
import { MTableToolbar } from 'material-table';
import { updateEvent } from '../../Redux/actions/resultAddAction';

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


export default function Events({team1_events,team2_events}) {
    const classes  = useStyles();


    return (
        <>
        <Grid container spacing={3} className={classes.container}>
            <Grid item sm={6} >
                
                <EventTable 
                    events={team1_events}
                />
            </Grid>
            <Grid item sm={6} >
                
                <EventTable 
                    events={team2_events}
                />
            </Grid>
        
        </Grid>
    </>
    )
}

function EventTable({events}){
    const classes  = useStyles();
    const columns = eventsTableColumns();

    const tabelActions = {
        update:updateEvent,
        // delete:removePlayerFromClub,
    }

    const {handleAddRow,handleUpdateRow,handleDeleteRow} = useTableActions(tabelActions)

    // const handleAdd = (newData) => handleAddRow({
    //     playermodel_id:newData.name,
    //     jersey:newData.jersey,
    //     club_id:club.id
    // })
    const handleUpdate = (newData) => handleUpdateRow({
        assist_player_id: newData.assist_player_id,
        club_id: newData.club_id,
        event_id: newData.event_id,
        fixture_id: newData.fixture_id,
        id: newData.id,
        minute: newData.minute,
        player_id: newData.player_id
    })
   
    // const handleDelete = (oldData) => handleDeleteRow({
    //         club_id:club.id,
    //         player_ids:[oldData.id]
    //     })

    return(
        <Mtable 
                columns={columns}
                data={events}
                title='Events'
                search={false}
                headerLess ={true}
                editable={true}
                handleUpdateRow={handleUpdate}
                // handleDeleteRow={handleDelete}

                
            />
    )
}
