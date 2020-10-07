import React,{useState, useEffect} from 'react'
import { Container, makeStyles, Button, CircularProgress, Grid } from '@material-ui/core'
import RatingsEdit from './RatingsEdit'
import EventsEdit from './EventsEdit';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFixtureDetails,loadingTrue, approveResult, fetchSubmittedResult } from '../../Redux/actions/resultAddAction';
import clsx from 'clsx';
import SubmitBtn from '@customComponent/SubmitBtn';
import Progress from '@customComponent/Progress';
import Notify from '@customComponent/Notify';
import { useHistory,Link, Redirect } from 'react-router-dom';
import Restricted from '@customComponent/Restricted';
import Teams from '@customComponent/Teams';
import ImageUpload from '../../CustomComponent/ImageUpload';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { fetchFixture,addMatchResult, resetUpdateResult, submitResult } from '../../Redux/Ducks/UpdateResultDuck';

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
    },
    container2:{
        [theme.breakpoints.down('sm')]:{
            padding:0
        }
    },
}))


export default function AddResult(props) {
    const classes  = useStyles();

    const toast = Notify();
    const history = useHistory();
    const [resultSubmitted, setResultSubmitted] = useState(false)
    const [stateLoading, setStateLoading] = useState(true)

    const match_id = props.match.params.match_id

    const {
        fixture,
        loading,
        fetching,
    } = useSelector(state => state.updateResult)
    

    const {user} = useSelector(state => state.sessionUser)
    const {club,loading:clubLoading} = useSelector(state => state.cuClub)

    const dispatch = useDispatch();

    const handleSubmitResult = ()=>{

        dispatch(submitResult(fixture.id))
        .then(res=>{
            console.log({res})
            toast(res,'success')
        })
        .catch(err=>{
            
            console.log({err})
            toast(err.message,'error')
        })
    }

    
    useEffect(()=>{
        dispatch(fetchFixture(match_id))
        .catch(err=>{
            history.push('/error')
            return;
        })
        
    },[])
    
    useEffect(()=>{
        return ()=>{
            dispatch(resetUpdateResult())
        }
    },[match_id])

    useEffect(()=>{

        if(!fetching){

                const own_match = fixture.team1_id == club.id || fixture.team2_id == club.id
                const is_team1 = fixture.team1_id == club.id
                const is_team2 = fixture.team2_id == club.id

                if(is_team1){
                    setResultSubmitted(fixture.completed == 2 || fixture.completed == 3)
                }
                if(is_team2){
                    setResultSubmitted(fixture.completed == 2 || fixture.completed == 4)
                }

                if(fixture.completed == 1){
                  
                    history.push({
                        pathname: '/error',
                        state: { 
                            code: 403,
                            message:'The result of this match has already been added.'
                         }
                    })
                    return;
                }

                if(!own_match){
                    history.push({
                        pathname: '/error',
                        state: { 
                            code: 403,
                            message:'Permission Denied.'
                         }
                    })
                    return;
                }

            setStateLoading(false)

        }
        

    },[fixture,user])


    return (
        <Container>
            {
                stateLoading ? <Progress size={30} /> : 
                <>
                    <div className={clsx({[classes.disable]:loading})}>
                        <div  style={{marginTop:'120px',marginBottom:'25px'}}>

                            <Teams 
                                panel='vs'
                                fixtureDetails={fixture}
                            />

                        </div>

                        <Container className={classes.container2}>

                            
                            <EventsEdit
                                panel={props.panel}
                            />

                        
                            <RatingsEdit
                                panel={props.panel}
                            />

                            <div className='text-center py-5'>

                                {
                                    resultSubmitted ?
                                    
                                        <div>
                                            <CheckCircleIcon style={{color:'green'}} />
                                            <div>Result Submitted.</div>
                                        </div>
                                    :
                                
                                        <SubmitBtn 
                                            label='Submit Result'
                                            handleSubmit={handleSubmitResult}
                                            submitDisabled={loading}
                                            progressStyle={{left:'41%',top:'20%'}}
                                        />
                                    
                                }


                            </div>

                        </Container>
                    </div>
          
                    
                </>
            }
        </Container>
    )
}
