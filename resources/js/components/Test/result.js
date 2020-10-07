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
import { fetchFixture,addMatchResult, resetUpdateResult } from '../../Redux/Ducks/UpdateResultDuck';

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

    const [btnDisable, setBtnDisable] = useState(false)
    const [success, setsuccess] = useState(false)
    const [stateLoading, setStateLoading] = useState(true)

    const match_id = props.match.params.match_id

    const {
        fixture,
        loading,
        fetching,
    } = useSelector(state => state.updateResult)
    
    const {
        eventsImages,
        ratings1Images,
        ratings2Images,
    } = useSelector(state => state.images)
    
    const {
        events,
        loading:eventsLoading,
        fetching:eventsFetching,
    } = useSelector(state => state.events)
    
    const {
        ratings,
    } = useSelector(state => state.ratings)

    const {user} = useSelector(state => state.sessionUser)

    const dispatch = useDispatch();

    const handleSubmitResult = ()=>{

        const formData = new FormData();

        for (let i = 0; i < eventsImages.length; i++) {
            formData.append("eventsImages[]", eventsImages[i]);
        }
        
        for (let i = 0; i < ratings1Images.length; i++) {
            formData.append("team1ratingsImages[]", ratings1Images[i]);
        }
        for (let i = 0; i < ratings2Images.length; i++) {
            formData.append("team2ratingsImages[]", ratings2Images[i]);
        }

        formData.append('fixture_id',fixture.id);

        if(user.club.id == fixture.team1_id){

            const fEvents = events.filter(item=>item.rating != 0).map(item=>{
                const {tableData,id,...event} = item
                return event;
            })

            formData.append('events',JSON.stringify(fEvents));
            
            const fRatings = ratings.filter(item=>item.rating != 0).map(item=>{
                const {tableData,id,...rating} = item
                return rating;
            })
            
            formData.append('ratings',JSON.stringify(fRatings));
        
        }

        console.log({formData})
        dispatch(addMatchResult(formData,
     
            { 
                headers: { "Content-Type": "multipart/form-data" } 
            }
        ))
        .then(response=>{
            toast(response,'success')
            setsuccess(true)
            setStateLoading(false)
        })
        .catch(error=>{
            if(error.errorCode == 422){
                Object.keys(error.errors).map(err=>{
                    toast(error.errors[err],'error')
                })
            }else{
                toast(error.message,'error')
            }
        })
    }

    
    useEffect(()=>{
        dispatch(fetchFixture(match_id))
        .catch(err=>{
            history.push('/error')
        })
        
    },[])
    
    useEffect(()=>{
        return ()=>{
            dispatch(resetUpdateResult())
        }
    },[match_id])

    useEffect(()=>{

        if(!fetching){

                const own_match = fixture.team1_id == user.club.id || fixture.team2_id == user.club.id
                const team1 = fixture.team1_id == user.club.id
                const team2 = fixture.team2_id == user.club.id

                if(fixture.completed == 1 || fixture.completed == 2){
                  
                    history.push({
                        pathname: '/error',
                        state: { 
                            code: 403,
                            message:'The result of this match has already been added.'
                         }
                    })
                    return;
                }

                if((team1 && fixture.completed == 3) || (team2 && fixture.completed == 4)){
                    history.push({
                        pathname: '/error',
                        state: { 
                            code: 403,
                            message:"You can't view this page."
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
    
    // useEffect(()=>{
    //     if(Object.keys(user).length > 0){
    //         if(Object.keys(ratings).length > 0 && user.club.id != fixture.team2_id){
    //             let t1 = ratings.filter(rating=>rating.club_id == fixture.team1_id && rating.rating != 0).length;
    //             let t2 = ratings.filter(rating=>rating.club_id == fixture.team2_id && rating.rating != 0).length;
    //             if(t1 > 10 && t2 > 10 && eventsImages.length > 0 && ratings1Images.length > 0 && ratings2Images.length > 0){
    //                 setBtnDisable(false)
    //             }else{
    //                 setBtnDisable(true)
    //             }
    //         }
    //         if(Object.keys(ratings).length > 0 && user.club.id == fixture.team2_id){
    //             if(eventsImages.length > 0 && ratings1Images.length > 0 && ratings2Images.length > 0){
    //                 setBtnDisable(false)
    //             }
    //         }  
    //     }
    // },[ratings,eventsImages,ratings1Images,ratings2Images])




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

                                        <Grid container spacing={3}>

                                            <Grid item xs={6} className='py-5'>

                                                {
                                                    success ?
                                                    
                                                        <div>
                                                            <CheckCircleIcon style={{color:'green'}} />
                                                            <div>Result Added.</div>
                                                        </div>
                                                    :
                                                
                                                        <SubmitBtn 
                                                            label='Submit Result'
                                                            handleSubmit={handleSubmitResult}
                                                            disabled={user.club.id == fixture.team2_id}
                                                            submitDisabled={loading}
                                                            progressStyle={{left:'41%',top:'20%'}}
                                                        />
                                                    
                                                }


                                            </Grid>
                                            <Grid xs={6} item className='py-5 text-right'>

                                                {
                                                    success ?
                                                    
                                                        <div>
                                                            <CheckCircleIcon style={{color:'green'}} />
                                                            <div>Result Added.</div>
                                                        </div>
                                                    :
                                                
                                                        <SubmitBtn 
                                                            label='Submit Result'
                                                            handleSubmit={handleSubmitResult}
                                                            disabled={user.club.id == fixture.team1_id}
                                                            submitDisabled={loading}
                                                            progressStyle={{left:'41%',top:'20%'}}
                                                        />
                                                    
                                                }


                                            </Grid>
                                    
                                   </Grid>

                                </Container>
                            </div>
          
                    
                </>
            }
        </Container>
    )
}
