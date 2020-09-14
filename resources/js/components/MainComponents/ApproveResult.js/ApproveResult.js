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
import { fetchSubmittedResult, submittedResultFetched, approveResult } from '../../Redux/actions/resultAddAction';
import ImageBox from './ImageBox';
import EventsEdit from '../AddResult/EventsEdit';
import clsx from 'clsx';
import RatingsEdit from '../AddResult/RatingsEdit';
import Notify from '@customComponent/Notify';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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
    },
    disable:{
        pointerEvents:'none',
        opacity:'.5'
    }
}))


export default function ApproveResult(props) {
    const classes  = useStyles();

    const history = useHistory();
    const {
        fetching,
        loading,
        error,
        fixture,
        events,
        ratings,
        images,
    } = useSelector(state=>state.addResult)

    const [success, setsuccess] = useState(false)
    const dispatch = useDispatch();
    const toast = Notify();
    
    const match_id = props.match.params.match_id;

    const handleApproveResult = ()=>{
        dispatch(approveResult({fixture_id:fixture.id}))
        .then(response=>{
            toast(response,'success')
            setsuccess(true)
        })
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

                                <EventsEdit 
                                    events={events} 
                                    team1_id={fixture.team1_id}
                                    team2_id={fixture.team2_id}
                                    team1_players={fixture.team1_details.players} 
                                    team2_players={fixture.team2_details.players}
                                    loading={loading}
                                    className={clsx({[classes.disable] : loading })} 
                                />

                                 <ImageBox 
                                    title={`Events (sumitted by ${fixture.team1_details.name})`}
                                    images={images.filter(item=>item.submitted_by == fixture.team1_id && item.field == 'event')}
                                />

                                <ImageBox 
                                    title={`Events (sumitted by ${fixture.team2_details.name})`}
                                    images={images.filter(item=>item.submitted_by == fixture.team2_id && item.field == 'event')}
                                />

                                <RatingsEdit
                                    ratings={ratings}
                                    team1_id={fixture.team1_id}
                                    team2_id={fixture.team2_id} 
                                    team1_players={fixture.team1_details.players} 
                                    team2_players={fixture.team2_details.players}
                                    loading={loading} 
                                    className={clsx({[classes.disable] : loading })} 
                                />

                                <ImageBox 
                                    title={`${fixture.team1_details.name} Ratings (sumitted by ${fixture.team1_details.name})`}
                                    images={images.filter(item=>item.submitted_by == fixture.team1_id && item.field == 'team1_Rating')}
                                />

                                <ImageBox 
                                    title={`${fixture.team1_details.name} Ratings (sumitted by ${fixture.team2_details.name})`}
                                    images={images.filter(item=>item.submitted_by == fixture.team2_id && item.field == 'team1_Rating')}
                                />

                                <ImageBox 
                                    title={`${fixture.team2_details.name} Ratings (sumitted by ${fixture.team1_details.name})`}
                                    images={images.filter(item=>item.submitted_by == fixture.team1_id && item.field == 'team2_Rating')}
                                />

                                <ImageBox 
                                    title={`${fixture.team2_details.name} Ratings (sumitted by ${fixture.team2_details.name})`}
                                    images={images.filter(item=>item.submitted_by == fixture.team2_id && item.field == 'team2_Rating')}
                                />

                                <div className='text-center py-5'>
                        
                                    {
                                            success ?
                                        
                                                
                                                <div>
                                                    <CheckCircleIcon style={{color:'green'}} />
                                                    <div>Result Approved.</div>
                                                </div>
                                            :
                                                <SubmitBtn 
                                                    label='Approve Result'
                                                    handleSubmit={handleApproveResult}
                                                    disabled={fixture.completed != 2}
                                                    submitDisabled={loading}
                                                    progressStyle={{left:'41%',top:'20%'}}
                                                />

                                            
                                        }
                                </div> 

                                
                            </Container>
                        </Container>
                    }   
                </>
            }
        </>        
    )
}
