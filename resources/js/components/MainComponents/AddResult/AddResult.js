import React,{useState, useEffect} from 'react'
import { Container, makeStyles, Button, CircularProgress } from '@material-ui/core'
import RatingsEdit from './RatingsEdit'
import Teams from '../MatchDetails/Teams'
import EventsEdit from './EventsEdit';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFixtureDetails, addMatchResult,loadingTrue } from '../../Redux/actions/resultAddAction';
import clsx from 'clsx';
import SubmitBtn from '@customComponent/SubmitBtn';
import Progress from '@customComponent/Progress';
import Notify from '@customComponent/Notify';
import { useHistory,Link } from 'react-router-dom';


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


export default function AddResult(props) {
    const classes  = useStyles();

    const toast = Notify();
    const history = useHistory();

    const [btnDisable, setBtnDisable] = useState(true)

    const match_id = props.match.params.match_id

    const {fixture,events,ratings,loading,submitLoading} = useSelector(state => state.addResult)
    const dispatch = useDispatch();


    const handleSubmitResult = ()=>{
       
        dispatch(addMatchResult(
            {
                'fixture_id':match_id,
                'events':events,
                'ratings':[
                    ...ratings.team1.filter(item=>item.rating != 0),
                    ...ratings.team2.filter(item=>item.rating != 0),
                ]
            }
        ))
        .then(response=>{
            toast(response,'success')
        })
        .catch(error=>{
            Object.keys(error).map(err=>{
                toast(error[err],'error')
            })
        })
    }


    useEffect(()=>{
        dispatch(fetchFixtureDetails(match_id))    
    },[])
    
    useEffect(()=>{
        if(!loading){
            let t1 = ratings.team1.filter(rating=>rating.rating != 0).length;
            let t2 = ratings.team2.filter(rating=>rating.rating != 0).length;
            if(t1 > 10 && t2 > 10){
                setBtnDisable(false)
            }else{
                setBtnDisable(true)
            }
        }   
    },[ratings])

  


    return (
        <Container>
            {
                loading ? <Progress size={30} /> : 
                <>

                    {
                        fixture.completed ? 

                        <div className='text-center mt-5'>
                            <h5>The Result Of This Match Has Already Added.</h5>
                            <Button variant='contained' color='secondary' onClick={()=>history.goBack()} className='my-4' >
                                Go Back
                            </Button>
                        </div>

                        :
                        <>
                            <div  style={{margin:'60px 0'}}>
                                <Teams 
                                    panel='vs'
                                    fixtureDetails={fixture}
                                />
                            </div>
                            <Container>
                                <EventsEdit
                                    events={events} 
                                    team1_id={fixture.team1_id}
                                    team2_id={fixture.team2_id}
                                    team1_players={fixture.team1_details.players} 
                                    team2_players={fixture.team2_details.players}
                                    loading={submitLoading}
                                    className={clsx({[classes.disable] : submitLoading })} 
                                />
                                <RatingsEdit
                                    ratings={ratings}
                                    team1_id={fixture.team1_id}
                                    team2_id={fixture.team2_id} 
                                    team1_players={fixture.team1_details.players} 
                                    team2_players={fixture.team2_details.players}
                                    loading={submitLoading} 
                                    className={clsx({[classes.disable] : submitLoading })} 
                                />

                                <div className='text-center py-5'>
                                    <SubmitBtn 
                                        label='Submit Result'
                                        handleSubmit={handleSubmitResult}
                                        disabled={btnDisable}
                                        submitDisabled={submitLoading}
                                        progressStyle={{left:'41%',top:'20%'}}
                                    />
                                </div>

                            </Container>
                        </>

                    }
                    
                </>
            }
        </Container>
    )
}
