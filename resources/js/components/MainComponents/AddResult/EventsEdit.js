import React,{useState} from 'react'
import Grid from '@material-ui/core/Grid';
import EventTable from './EventTable';

export default function EventsEdit({team1_players,team2_players,team1_id,team2_id,events,loading,className}) {
  

    return (
        <Grid container spacing={3} className={className}>
            <Grid item sm={6} >
                
                <EventTable 
                    players={team1_players}
                    club_id={team1_id}
                    events={events.filter(event=>event.club_id === team1_id)}
                    loading={loading}
                />
            </Grid>

            <Grid item sm={6}>
                <EventTable 
                    players={team2_players}
                    club_id={team2_id}
                    events={events.filter(event=>event.club_id === team2_id)}
                    loading={loading}
                    />
            </Grid>
        
        </Grid>
    )
}

