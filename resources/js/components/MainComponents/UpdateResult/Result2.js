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


export default function Result(props) {
    const classes  = useStyles();

    const toast = Notify();
    const history = useHistory();

    const [btnDisable, setBtnDisable] = useState(true)
    const [success, setsuccess] = useState(false)
    const [restricted,setRestricted] = useState({
        state:true,
        msg:''
    })

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
    const {user,fetching:userFetching} = useSelector(state => state.session)

    const {tournaments} = useSelector(state=>state.tournaments)


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


        dispatch(addMatchResult(formData,
     
            { 
                headers: { "Content-Type": "multipart/form-data" } 
            }
        ))
        .then(response=>{
            toast(response,'success')
            setsuccess(true)
        })
        .catch(error=>{
            
            Object.keys(error.errors).map(err=>{
                toast(error.errors[err],'error')
            })
        })
    }

    const handleApproveResult = ()=>{
        dispatch(approveResult({fixture_id:fixture.id}))
        .then(response=>{
            toast(response,'success')
            setsuccess(true)
        })
    }
    
    useEffect(()=>{
        if(props.panel == 'addresult'){
            dispatch(fetchFixtureDetails(match_id))
            .catch(err=>{
                console.log({err})
                history.push('/error')
            })
        }else{
            dispatch(fetchSubmittedResult(match_id))
            .catch(err=>{
                console.log({err})
                history.push('/error')
            })
        }
    },[])

    useEffect(()=>{
        let restriction = {
            state:false,
            msg:''
        }

        if(!fetching){
        
                const tournament = tournaments.find(item=>item.id == fixture.tournament_id)
                const is_official = tournament.officials.some(item=>item.user_id == user.id)
                const own_match = fixture.team1_id == user.club.id || fixture.team2_id == user.club.id
                const team1 = fixture.team1_id == user.club.id
                const team2 = fixture.team2_id == user.club.id

                if(fixture.completed == 1){
                 
                    restriction = {
                        state:true,
                        msg:"The Result Of This Match Has Already Been Added."
                    }
                }else if(props.panel == 'approveresult'){

                    if(is_official == false || own_match == true ){
                        restriction = {
                            state:true,
                            msg:"You Can't View This Page.1"
                        }
                    }else{

                        restriction = {
                            state:false,
                            msg:''
                        }
                    }

                }else if(props.panel == 'addresult'){
                    if((team1 && fixture.completed == 3) || (team2 && fixture.completed == 4)){
                        restriction = {
                            state:true,
                            msg:"You Can't View This Page.3"
                        }
                    }
                
                }else{
                    restriction = {
                        state:false,
                        msg:''
                    }
                }
                setRestricted(restriction)
        }
        

    },[fixture,user])
    
    useEffect(()=>{
        if(Object.keys(user).length > 0){
            if(Object.keys(ratings).length > 0 && user.club.id != fixture.team2_id){
                let t1 = ratings.filter(rating=>rating.club_id == fixture.team1_id && rating.rating != 0).length;
                let t2 = ratings.filter(rating=>rating.club_id == fixture.team2_id && rating.rating != 0).length;
                if(t1 > 10 && t2 > 10){
                    setBtnDisable(false)
                }else{
                    setBtnDisable(true)
                }
            }  
        }
    },[ratings])

    useEffect(()=>{
        if(eventsImages.length > 0 && ratings1Images.length > 0 && ratings2Images.length > 0){
            setBtnDisable(false)
        }
    },[eventsImages,ratings1Images,ratings2Images,])

  

    return (
        <Container>
            {
                fetching ? <Progress size={30} /> : 
                <>

                    {
                        restricted.state ?

                            <Restricted msg={restricted.msg} />

                            :
                        
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
                                                    <div>Result Added.</div>
                                                </div>
                                            :
                                        <>
                                            {
                                                props.panel == 'addresult' &&
                                                
                                                <SubmitBtn 
                                                    label='Submit Result'
                                                    handleSubmit={handleSubmitResult}
                                                    disabled={btnDisable}
                                                    submitDisabled={loading}
                                                    progressStyle={{left:'41%',top:'20%'}}
                                                />

                                            }

                                            {
                                                props.panel == 'approveresult' &&
                                                
                                                    <SubmitBtn 
                                                        label='Approve Result'
                                                        handleSubmit={handleApproveResult}
                                                        disabled={fixture.completed != 2}
                                                        submitDisabled={loading}
                                                        progressStyle={{left:'41%',top:'20%'}}
                                                    />
                                            
                                            }
                                            </>
                                            
                                            
                                        }


                                    </div>

                                </Container>
                            </div>
                        

                      

                    }
                    
                </>
            }
        </Container>
    )
}
