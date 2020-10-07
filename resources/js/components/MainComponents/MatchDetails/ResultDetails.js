import React,{useState,useEffect} from 'react'
import { Container, makeStyles,Button } from '@material-ui/core'
import Events from './Events'
import Ratings from './Ratings'
import Teams from '@customComponent/Teams';
import { fetchResultDetails } from '../../Redux/Ducks/ResultDetailsDuck'
import { useSelector, useDispatch } from 'react-redux';
import Progress from '@customComponent/Progress';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme=>({
    container:{
        boxShadow:'0 6px 12px rgba(0,0,0,.1)',
        marginTop:'30px',
    },
    container2:{
        [theme.breakpoints.down('sm')]:{
            padding:0
        }
    },
    listItemContainer:{
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    }
}))


export default function ResultDetails(props) {
    const classes  = useStyles();

    const history = useHistory();

    const {
        result,
        fetching
    } = useSelector(state=>state.resultDetails)

    const dispatch = useDispatch();

    const match_id = props.match.params.match_id

    useEffect(()=>{
        dispatch(fetchResultDetails(match_id))
        .catch(error=>{
            history.push('/error')
            return;
        })    
    },[])

    return (
        <>
            {
                fetching ?

                <Progress />
                :

                <>
                        <Container>
                            <div  style={{marginTop:'120px',marginBottom:'25px'}}>
                                <Teams 
                                    fixtureDetails = {result.fixture} 
                                />
                            </div>
                            <Container className={classes.container2}>
                                <Events 
                                    team1_events={result.events.filter(item=>item.club_id == result.fixture.team1_id)} 
                                    team2_events={result.events.filter(item=>item.club_id == result.fixture.team2_id)} 

                                />
                                
                                <Ratings
                                    team1_name={result.fixture.team1_details.name} 
                                    team2_name={result.fixture.team2_details.name} 
                                    team1_ratings = {result.ratings.filter(item=>item.club_id == result.fixture.team1_id)}
                                    team2_ratings = {result.ratings.filter(item=>item.club_id == result.fixture.team2_id)}
                                />
                            </Container>
                        </Container>
                     
                </>
            }
        </>        
    )
}
