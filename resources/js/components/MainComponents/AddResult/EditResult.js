import React,{useState,useEffect} from 'react'
import { Container, makeStyles,Button } from '@material-ui/core'
import Events from './Events'
import Ratings from './Ratings'
import Teams from '@customComponent/Teams';
import SubmitBtn from '@customComponent/SubmitBtn';
import { fetchResultDetails } from '../../Redux/actions/resultActions'
import { useSelector, useDispatch } from 'react-redux';
import Progress from '@customComponent/Progress';
import { useHistory } from 'react-router-dom'
import { fetchSubmittedResult, submittedResultFetched } from '../../Redux/actions/resultAddAction';
import ImageBox from './ImageBox';

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


export default function ApproveResult(props) {
    const classes  = useStyles();

    const history = useHistory();

    const {
        fetching,
        // submittedResult,
        error,
        fixture,
        events,
        ratings,
        event_images_sub_by_team1,
        event_images_sub_by_team2,
        team1_ratings_images_sub_by_team1,
        team1_ratings_images_sub_by_team2,
        team2_ratings_images_sub_by_team1,
        team2_ratings_images_sub_by_team2,
    } = useSelector(state=>state.addResult)


    const dispatch = useDispatch();

    const match_id = props.match.params.match_id;

    const handleApproveResult = ()=>{

    }

    useEffect(()=>{
        dispatch(fetchSubmittedResult(match_id))
    },[])

    return (
        <>
            {
                fetching ?

                <Progress />
                :

                <>

                    {
                        Object.keys(error).length > 0 ? 

                        <div className='text-center mt-5'>
                            <h5>Result not found.</h5>
                            <Button variant='contained' color='secondary' onClick={()=>history.goBack()} className='my-4' >
                                Go Back
                            </Button>
                        </div>

                        :

                        <Container>
                            <div  style={{marginTop:'120px',marginBottom:'25px'}}>
                                <Teams 
                                    fixtureDetails = {fixture} 
                                    panel='vs'
                                />
                            </div>
                            <Container>
                                <Events 
                                    team1_events={events.team1} 
                                    team2_events={events.team2} 
                                />

                                <ImageBox 
                                    title={`Events (sumitted by ${fixture.team1_details.name})`}
                                    images={event_images_sub_by_team1}
                                />

                                <ImageBox 
                                    title={`Events (sumitted by ${fixture.team2_details.name})`}
                                    images={event_images_sub_by_team2}
                                />
                                
                                <Ratings
                                    team1_name={fixture.team1_details.name} 
                                    team2_name={fixture.team2_details.name} 
                                    team1_ratings = {ratings.team1}
                                    team2_ratings = {ratings.team2}
                                />

                                <ImageBox 
                                    title={`${fixture.team1_details.name} Ratings (sumitted by ${fixture.team1_details.name})`}
                                    images={team1_ratings_images_sub_by_team1}
                                />

                                <ImageBox 
                                    title={`${fixture.team1_details.name} Ratings (sumitted by ${fixture.team2_details.name})`}
                                    images={team1_ratings_images_sub_by_team2}
                                />

                                <ImageBox 
                                    title={`${fixture.team2_details.name} Ratings (sumitted by ${fixture.team1_details.name})`}
                                    images={team2_ratings_images_sub_by_team1}
                                />

                                <ImageBox 
                                    title={`${fixture.team2_details.name} Ratings (sumitted by ${fixture.team2_details.name})`}
                                    images={team2_ratings_images_sub_by_team2}
                                />

                                <div className='text-center py-5'>
                                    <SubmitBtn 
                                        label='Submit Result'
                                        handleSubmit={handleApproveResult}
                                        disabled={false}
                                        progressStyle={{left:'41%',top:'20%'}}
                                    />
                                </div>

                                
                            </Container>
                        </Container>
                    }   
                </>
            }
        </>        
    )
}
