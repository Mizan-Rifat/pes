import React,{useState} from 'react'
import Grid from '@material-ui/core/Grid';
import EventTable from './EventTable';

export default function EventsEdit({team1_players,team2_players,team1_id,team2_id}) {
    const [id,setId] = useState(1)
    return (
        <Grid container spacing={3} >
            <Grid item sm={6} >
                
                <EventTable 
                    players={team1_players}
                    club_id={team1_id}
                    team={1}
                    id={id}
                    setId={setId}
                />
            </Grid>

            <Grid item sm={6}>
                <EventTable 
                    players={team2_players}
                    club_id={team2_id}
                    team={2}
                    id={id}
                    setId={setId}
                    />
            </Grid>
        
        </Grid>
    )
}

