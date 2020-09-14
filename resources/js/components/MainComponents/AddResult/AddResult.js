import React,{useState, useEffect} from 'react'
import { Container, makeStyles, Button, CircularProgress } from '@material-ui/core'
import RatingsEdit from './RatingsEdit'
import EventsEdit from './EventsEdit';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFixtureDetails, addMatchResult,loadingTrue, resetAddResult } from '../../Redux/actions/resultAddAction';
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
    }
}))


export default function AddResult(props) {
    const classes  = useStyles();

    const toast = Notify();
    const history = useHistory();

    const [btnDisable, setBtnDisable] = useState(true)
    const [success, setsuccess] = useState(false)
    const [restricted,setRestricted] = useState({
        state:false,
        msg:''
    })

    const match_id = props.match.params.match_id

    const {
        fixture,
        events,
        ratings,
        eventsImages,
        ratings1Images,
        ratings2Images,
        eventKey,
        ratingKey,
        loading,
        fetching
    } = useSelector(state => state.addResult)
    const {user} = useSelector(state => state.session)
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


    useEffect(()=>{
        dispatch(fetchFixtureDetails(match_id))
    },[])

    useEffect(()=>{
        if(Object.keys(user).length == 0){
            setRestricted({
                state:true,
                msg:'You have to be logged in to view this page.'
            })
        }else if(fixture.team1_id != user.club.id && fixture.team2_id != user.club.id){
            setRestricted({
                state:true,
                msg:"You Can't Add Result Of This Match."
            })
        }
        
        if(fixture.completed == 1){
            setRestricted({
                state:true,
                msg:'The Result Of This Match Has Already Been Added.'
            })
        }
        
    },[fixture,user])
    
    useEffect(()=>{
        if(Object.keys(ratings).length > 0 && user.club.id != fixture.team2_id){
            let t1 = ratings.filter(rating=>rating.club_id == fixture.team1_id && rating.rating != 0).length;
            let t2 = ratings.filter(rating=>rating.club_id == fixture.team2_id && rating.rating != 0).length;
            if(t1 > 10 && t2 > 10){
                setBtnDisable(false)
            }else{
                setBtnDisable(true)
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
                        
                            <>
                                <div  style={{marginTop:'120px',marginBottom:'25px'}}>
                                    <Teams 
                                        panel='vs'
                                        fixtureDetails={fixture}
                                    />
                                </div>
                                <Container>

                                    {
                                        fixture.team2_id != user.club.id &&
                                    
                                        <EventsEdit
                                            events={events} 
                                            team1_id={fixture.team1_id}
                                            team2_id={fixture.team2_id}
                                            team1_players={fixture.team1_details.players} 
                                            team2_players={fixture.team2_details.players}
                                            loading={loading}
                                            className={clsx({[classes.disable] : loading })}
                                            fixture_id={fixture.id}
                                            eventKey={eventKey} 
                                            editable={true}
                                        />
                                    }
                                    <ImageUpload 
                                        buttonText='Upload Event images'
                                        label='eventsImages'
                                    />
                                    {
                                        fixture.team2_id != user.club.id &&
                                    
                                        <RatingsEdit
                                            ratings={ratings}
                                            team1_id={fixture.team1_id}
                                            team2_id={fixture.team2_id} 
                                            team1_players={fixture.team1_details.players} 
                                            team2_players={fixture.team2_details.players}
                                            loading={loading} 
                                            className={clsx({[classes.disable] : loading })}
                                            fixture_id={fixture.id} 
                                            ratingKey={ratingKey}
                                            editable={true} 
                                        />
                                    }
                                    <ImageUpload 
                                        buttonText='Upload team1 ratings images'
                                        label='ratings1Images'
                                    />
                                    <ImageUpload 
                                        buttonText='Upload team2 ratings images'
                                        label='ratings2Images'
                                    />

                                    <div className='text-center py-5'>

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
                                                    disabled={btnDisable}
                                                    submitDisabled={loading}
                                                    progressStyle={{left:'41%',top:'20%'}}
                                                />

                                            
                                        }


                                    </div>

                                </Container>
                            </>
                        

                      

                    }
                    
                </>
            }
        </Container>
    )
}
