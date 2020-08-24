import React,{useEffect} from 'react'
import { Grid } from '@material-ui/core'
import EventPanel from './EventPanel'
import RatingsPanel from './RatingsPanel';
import {makeStyles} from '@material-ui/core';
import { fetchResultDetails } from '@actions/resultActions';
import { useSelector,useDispatch } from 'react-redux';


const useStyles=makeStyles(theme=>({
    container:{
        padding:'10px',
        background:'#eee'
    }
}))


export default function DetailPanel({id,team1_id,team2_id}) {
    const classes = useStyles();
    
    const {
        team1_events,
        team1_ratings,
        team2_events,
        team2_ratings,
        loading,
        team1,
        team2
    } = useSelector(state=>state.results)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchResultDetails(id))
    }, [])
    return (
        <>
        {
            loading ? '' :
        

            <div className={classes.container}>

                <Grid container spacing={2}>

                    <Grid item xs={12} sm={6}>
                        <EventPanel
                            fixture_id={id} 
                            events={team1_events} 
                            team='Team1'
                            club_id={team1_id} 
                            players={team1}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <EventPanel 
                            fixture_id={id}
                            events={team2_events} 
                            team='Team2' 
                            club_id={team2_id} 
                            players={team2}
                        />
                    </Grid>

                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <RatingsPanel 
                            fixture_id={id}
                            ratings={team1_ratings}
                            team='Team1'
                            club_id={team1_id}
                            players={team1}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RatingsPanel 
                            fixture_id={id} 
                            ratings={team2_ratings} 
                            team='Team2' 
                            club_id={team2_id} 
                            players={team2}
                        />
                    </Grid>
                </Grid>
                
            </div>
        }
        </>
    )
}
