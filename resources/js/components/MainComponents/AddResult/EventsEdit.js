import React,{useState} from 'react'
import Grid from '@material-ui/core/Grid';
import EventTable from './EventTable';

export default function EventsEdit({team1_players,team2_players,team1_id,team2_id,events,loading,className,fixture_id,eventKey,updateMode,editable}) {
  

    return (
        <Grid container spacing={3} className={className}>
            <Grid item sm={6} >
                
                <EventTable 
                    players={team1_players}
                    club_id={team1_id}
                    events={events.filter(item=>item.club_id == team1_id)}
                    loading={loading}
                    team={1}
                    fixture_id={fixture_id}
                    eventKey={eventKey}
                    updateMode={updateMode}
                    editable={editable}
                />
            </Grid>

            <Grid item sm={6}>
                <EventTable 
                    players={team2_players}
                    club_id={team2_id}
                    events={events.filter(item=>item.club_id == team2_id)}
                    loading={loading}
                    team={2}
                    fixture_id={fixture_id}
                    eventKey={eventKey}
                    updateMode={updateMode}
                    editable={editable}
                />
            </Grid>
        
        </Grid>
    )
}

