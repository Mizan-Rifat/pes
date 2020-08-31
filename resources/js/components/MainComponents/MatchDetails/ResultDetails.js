import React,{useState,useEffect} from 'react'
import { Container, makeStyles,Button } from '@material-ui/core'
import Events from './Events'
import Ratings from './Ratings'
import Teams from './Teams'
import { fetchResultDetails } from '../../Redux/actions/resultActions'
import { useSelector, useDispatch } from 'react-redux';
import Progress from '@customComponent/Progress';
import { useHistory } from 'react-router-dom'

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


export default function ResultDetails(props) {
    const classes  = useStyles();

    const history = useHistory();

    const {
        resultDetails,
        resultDetailsLoading,
    } = useSelector(state=>state.results)

    const [error, seterror] = useState(true)

    const dispatch = useDispatch();

    const match_id = props.match.params.match_id

    useEffect(()=>{
        dispatch(fetchResultDetails(match_id,false))
        .then(response=>seterror(false))
        .catch(error=>{

            // history.push('/')
            seterror(true)
            console.log({ll:error})
        })    
    },[])

    return (
        <>
            {
                resultDetailsLoading ?

                <Progress />
                :

                <>

                    {
                        error ? 

                        <div className='text-center mt-5'>
                            <h5>Result not found.</h5>
                            <Button variant='contained' color='secondary' onClick={()=>history.goBack()} className='my-4' >
                                Go Back
                            </Button>
                        </div>

                        :

                        <Container>
                            <div  style={{marginTop:'60px'}}>
                                <Teams 
                                    fixtureDetails = {resultDetails.fixture} 
                                />
                            </div>
                            <Container>
                                <Events 
                                    team1_events={resultDetails.team1_events} 
                                    team2_events={resultDetails.team2_events} 
                                />
                                
                                <Ratings
                                    team1_name={resultDetails.fixture.team1_details.name} 
                                    team2_name={resultDetails.fixture.team2_details.name} 
                                    team1_ratings = {resultDetails.team1_ratings}
                                    team2_ratings = {resultDetails.team2_ratings}
                                />
                            </Container>
                        </Container>
                    }   
                </>
            }
        </>        
    )
}
