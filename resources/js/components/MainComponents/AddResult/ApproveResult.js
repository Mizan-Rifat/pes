import React,{useState, useEffect} from 'react'
import { Container, makeStyles, Button, CircularProgress } from '@material-ui/core'
import RatingsEdit from './RatingsEdit'
import EventsEdit from './EventsEdit';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFixtureDetails, addMatchResult,loadingTrue, approveResult, fetchSubmittedResult } from '../../Redux/actions/resultAddAction';
import clsx from 'clsx';
import SubmitBtn from '@customComponent/SubmitBtn';
import Progress from '@customComponent/Progress';
import Notify from '@customComponent/Notify';
import { useHistory,Link } from 'react-router-dom';
import Restricted from '@customComponent/Restricted';
import Teams from '@customComponent/Teams';
import ImageUpload from '../../CustomComponent/ImageUpload';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { fetchOfficials, addOfficials, deleteOfficials } from '@actions/officialsAction';


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


export default function ApproveResult(props) {
    const classes  = useStyles();

    const toast = Notify();
    const history = useHistory();

    const [success, setsuccess] = useState(false)

    const [stateLoading, setStateLoading] = useState(true)

    const match_id = props.match.params.match_id

    const {
        fixture,
        events,
        ratings,
        images,
        eventsImages,
        ratings1Images,
        ratings2Images,
        eventKey,
        ratingKey,
        loading,
        fetching,
        error
    } = useSelector(state => state.addResult)

    const {user} = useSelector(state => state.session)

    const {officials,fetching:officialsFetching} = useSelector(state=>state.officials)

    const dispatch = useDispatch();

    const handleApproveResult = ()=>{
        dispatch(approveResult({fixture_id:fixture.id}))
        .then(response=>{
            toast(response,'success')
            setsuccess(true)
        })
    }
    
    useEffect(()=>{
        
            dispatch(fetchSubmittedResult(match_id))
            .then(response=>{
                console.log({response})
                dispatch(fetchOfficials(response.fixture.tournament_id))
            })
            .catch(err=>{
                console.log({err})
                history.push('/error')
            })

             
    },[])

    useEffect(()=>{

        if(!fetching && !officialsFetching){
        
                const is_official = officials.some(item=>item.user_id == user.id)
                const own_match = fixture.team1_id == user.club.id || fixture.team2_id == user.club.id

                console.log('fc',fixture.completed)
                console.log({is_official})
                console.log({own_match})


                if(fixture.completed != 2 || is_official == false || own_match == true){
                    history.push('/error')
                }

                setStateLoading(false)
                
        }
        
    },[fixture,user,officials])
    

  

    return (
        <Container>
            {
                stateLoading || officialsFetching ? <Progress size={30} /> : 
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
                            </div>
                </>
            }
        </Container>
    )
}
