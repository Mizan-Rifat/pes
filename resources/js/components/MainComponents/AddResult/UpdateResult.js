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


export default function UpdateResult(props) {
    const classes  = useStyles();

    const toast = Notify();
    const history = useHistory();
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

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchSubmittedResult(match_id))
        .catch(err=>{
            console.log({err})
            history.push('/error')
        })
    },[])

    useEffect(()=>{
     
        if(!fetching){

            const own_match = fixture.team1_id == user.club.id || fixture.team2_id == user.club.id
            const team1 = fixture.team1_id == user.club.id
            const team2 = fixture.team2_id == user.club.id

            if(!own_match){
                console.log('1')
                history.push('/error')
            }
            if(fixture.completed == 1){
                console.log('2')
                history.push('/error')
            }

            if(fixture.completed != 2){
                if((team1 && fixture.completed != 3) || (team2 && fixture.completed != 4)){
                    history.push('/error')
                }
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

                        </Container>
                    </div>
                    
                </>
            }
        </Container>
    )
}
