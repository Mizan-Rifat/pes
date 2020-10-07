import React,{useState, useEffect} from 'react'
import { Container, makeStyles, Grid, CircularProgress } from '@material-ui/core'
import RatingsEdit from './RatingsEdit'
import EventsEdit from './EventsEdit';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import SubmitBtn from '@customComponent/SubmitBtn';
import Progress from '@customComponent/Progress';
import Notify from '@customComponent/Notify';
import { useHistory,Link } from 'react-router-dom';
import Restricted from '@customComponent/Restricted';
import Teams from '@customComponent/Teams';
import ImageUpload from '../../CustomComponent/ImageUpload';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { fetchFixture, resetUpdateResult, approveResult } from '../../Redux/Ducks/UpdateResultDuck';
import { fetchOfficials } from '../../Redux/Ducks/OfficialsDuck';
import RejectResult from './RejectResult';

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

    const {officials,fetching:officialsFetching} = useSelector(state=>state.officials)

    const {
        fixture,
        loading,
        fetching,
    } = useSelector(state => state.updateResult)
    

    const {user} = useSelector(state => state.sessionUser)
    const {club,loading:clubLoading} = useSelector(state => state.cuClub)

    const dispatch = useDispatch();

    const handleApproveResult = ()=>{
        dispatch(approveResult(fixture.id))
        .then(response=>{
            toast(response,'success')
            setsuccess(true)
        })
        .catch(error=>{
            toast(error.message,'error')
        })
    }


    useEffect(()=>{
        dispatch(fetchFixture(match_id))
        .then(response=>{
            dispatch(fetchOfficials(response.fixture.tournament_id))
        })
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

        if(!fetching && !officialsFetching){
        
                const is_official = officials.some(item=>item.id == user.id)
                const own_match = fixture.team1_id == user.club.id || fixture.team2_id == user.club.id

                console.log('fc',fixture.completed)
                console.log({is_official})
                console.log({own_match})


                if(is_official == false || own_match == true){
                    history.push('/error')
                    return;
                }

                setStateLoading(false)
                
        }
        
    },[fixture,user,officials])
    

  

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

                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>

                                            <div className='text-center'>
                                                {
                                                    fixture.completed == 2 || fixture.completed == 3 ?
                                                    <>    
                                                        <CheckCircleIcon style={{color:'green'}} />
                                                        <div>Result Submitted</div>
                                                    </>
                                                    :
                                                    <>
                                                        <CancelIcon style={{color:'red'}} />
                                                        <div>Result not submitted.</div>
                                                    </>
                                                }
                                            </div>
                                            
                                        </Grid>

                                        <Grid item xs={12} sm={6} >
                                            <div className='text-center'>
                                                {
                                                    fixture.completed == 2 || fixture.completed == 4 ?
                                                    <>    
                                                        <CheckCircleIcon style={{color:'green'}} />
                                                        <div>Result Submitted</div>
                                                    </>
                                                    :
                                                    <>
                                                        <CancelIcon style={{color:'red'}} />
                                                        <div>Result not submitted.</div>
                                                    </>
                                                }
                                            </div>
                                        </Grid>
                                    
                                    </Grid>

                                   
                                        <EventsEdit
                                            panel={props.panel}
                                        />

                                    
                                        <RatingsEdit
                                            panel={props.panel}
                                        />

                                        <RejectResult 
                                            club={fixture.team1_details}
                                            fixture={fixture}
                                            
                                        />
                                        <RejectResult 
                                            club={fixture.team2_details}
                                            fixture={fixture}
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
