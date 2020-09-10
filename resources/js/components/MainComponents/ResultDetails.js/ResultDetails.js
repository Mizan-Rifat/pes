import React,{useState, useEffect} from 'react'
import { Container, makeStyles, Button, CircularProgress } from '@material-ui/core'
import RatingsEdit from './RatingsEdit'
import Teams from '../ApproveResult.js/Teams'
import EventsEdit from './EventsEdit';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFixtureDetails, addMatchResult,loadingTrue, resetAddResult } from '../../Redux/actions/resultAddAction';
import clsx from 'clsx';
import SubmitBtn from '@customComponent/SubmitBtn';
import Progress from '@customComponent/Progress';
import Notify from '@customComponent/Notify';
import { useHistory,Link } from 'react-router-dom';
import Restricted from '../../CustomComponent/Restricted';


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


export default function ResultDetails(props) {
    const classes  = useStyles();

    const toast = Notify();
    const history = useHistory();

    const [btnDisable, setBtnDisable] = useState(true)

    const match_id = props.match.params.match_id

    const {fixture,events,ratings,loading,fetching} = useSelector(state => state.addResult)
    const {user} = useSelector(state => state.session)
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
            
            Object.keys(error.errors).map(err=>{
                toast(error.errors[err],'error')
            })
        })
    }


    useEffect(()=>{
        dispatch(fetchFixtureDetails(match_id))
    },[])
    
    useEffect(()=>{
        if(Object.keys(ratings).length > 0){
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
                fetching ? <Progress size={30} /> : 
                <>

                    {
                        restricted ? 

                        <Restricted msg='The Result Of This Match Has Already Been Added.' />
                        :

                        <>
                        
                            
                                <div  style={{marginTop:'120px',marginBottom:'25px'}}>
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
                                        loading={loading}
                                        className={clsx({[classes.disable] : loading })} 
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

                                    <div className='text-center py-5'>
                                        <SubmitBtn 
                                            label='Submit Result'
                                            handleSubmit={handleSubmitResult}
                                            disabled={false}
                                            submitDisabled={loading}
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
