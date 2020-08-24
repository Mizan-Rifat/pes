import React,{useState, useEffect} from 'react'
import { Container, makeStyles } from '@material-ui/core'
import RatingsEdit from './RatingsEdit'
import Teams from '../MatchDetails/Teams'
import EventsEdit from './EventsEdit';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFixtureDetails } from '../../Redux/actions/resultAddAction';

const useStyles = makeStyles(theme=>({
    container:{
        boxShadow:'0 6px 12px rgba(0,0,0,.1)',
        marginTop:'30px',
    },
    listItemContainer:{
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    }
}))


export default function AddResult(props) {
    const classes  = useStyles();

    const [data, setData] = useState({
        team1_events:[],
        team2_events:[],
        team1_ratings:[],
        team2_ratings:[],
    })

    const match_id = props.match.params.match_id

    const {fixture,loading} = useSelector(state => state.addResult)
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(fetchFixtureDetails(match_id))    
    },[])

    console.log({fixture})


    return (
        <Container>
            {
                loading ? '' : 
                <>
                    <Teams 
                        panel='vs'
                        team1_name={fixture.team1_details.name}
                        team2_name={fixture.team2_details.name}
                        team1_logo={fixture.team1_details.logo}
                        team2_logo={fixture.team2_details.logo}
                    />
                    <Container>
                        <EventsEdit 
                            team1_id={fixture.team1_id}
                            team2_id={fixture.team2_id}
                            team1_players={fixture.team1_details.players} 
                            team2_players={fixture.team2_details.players} 
                        />
                        <RatingsEdit 
                            team1_players={fixture.team1_details.players} 
                            team2_players={fixture.team2_details.players}
                        />
                    </Container>
                </>
            }
        </Container>
    )
}
