import React,{useState, useEffect} from 'react'
import { Container, makeStyles, Button, CircularProgress } from '@material-ui/core'
import RatingsEdit from './RatingsEdit'
import EventsEdit from './EventsEdit';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFixtureDetails, addMatchResult,loadingTrue, resetAddResult, fetchSubmittedResult } from '../../Redux/actions/resultAddAction';
import clsx from 'clsx';
import SubmitBtn from '@customComponent/SubmitBtn';
import Progress from '@customComponent/Progress';
import Notify from '@customComponent/Notify';
import { useHistory,Link } from 'react-router-dom';
import Restricted from '@customComponent/Restricted';
import Teams from '@customComponent/Teams';
import ImageUpload from '../../CustomComponent/ImageUpload';
import ImageBox from '../ApproveResult.js/ImageBox';


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


export default function EditResult(props) {
    const classes  = useStyles();

    const toast = Notify();
    const history = useHistory();

    const [btnDisable, setBtnDisable] = useState(true)

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
        fetching,
        images
    } = useSelector(state => state.addResult)

    const {user} = useSelector(state => state.session)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchSubmittedResult(match_id))
    },[])
    
    useEffect(()=>{
        if(Object.keys(ratings).length > 0){
            let t1 = ratings.filter(rating=>rating.club_id == fixture.team1_id && rating.rating != 0).length;
            let t2 = ratings.filter(rating=>rating.club_id == fixture.team2_id && rating.rating != 0).length;
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
                        fixture.completed === true ? 

                        <Restricted msg='The Result Of This Match Has Already Been Added.' />
                        :

                        <>

                        {
                        
                            fixture.team1_id != user.club.id && fixture.team2_id != user.club.id ?

                            // false ?

                                <Restricted msg="You Can't Add Result Of This Match." />

                            :
                        
                            <div className={clsx({[classes.disable]:loading})}>
                                <div  style={{marginTop:'120px',marginBottom:'25px'}}>
                                    <Teams 
                                        panel='vs'
                                        fixtureDetails={fixture}
                                    />
                                </div>
                                <Container>

                                    {
                                        fixture.team2_id != user.club.id ?
                                        
                                        <>
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
                                                updateMode={true}
                                                editable={true} 
                                            />
                                            <ImageBox 
                                                title={`Events`}
                                                images={images.filter(item=>item.submitted_by == fixture.team1_id && item.field == 'event')}
                                                loading={loading}
                                                updateMode={true}
                                            />

                                        </>
                                        :
                                        <ImageBox 
                                            title={`Events`}
                                            images={images.filter(item=>item.submitted_by == fixture.team2_id && item.field == 'event')}
                                            loading={loading}
                                            className={clsx({[classes.disable] : loading })}
                                            updateMode={true}
                                        />

                                    }


                                    <ImageUpload 
                                        buttonText='Upload Event images'
                                        label='eventsImages'
                                        updateMode={true}
                                        fixture_id={fixture.id}
                                    />

                                    {
                                        fixture.team2_id != user.club.id ?
                                        <>
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
                                                updateMode={true}
                                                editable={true}
                                                 
                                            />

                                            <ImageBox 
                                                title={`${fixture.team1_details.name} Ratings`}
                                                images={images.filter(item=>item.submitted_by == fixture.team1_id && item.field == 'team1_Rating')}
                                                loading={loading}
                                                className={clsx({[classes.disable] : loading })}
                                                updateMode={true}
                                            />

                                            <ImageBox 
                                                title={`${fixture.team2_details.name} Ratings`}
                                                images={images.filter(item=>item.submitted_by == fixture.team1_id && item.field == 'team2_Rating')}
                                                loading={loading}
                                                className={clsx({[classes.disable] : loading })}
                                                updateMode={true}
                                            />

                                            

                                        </>

                                        :
                                        <>

                                            <ImageBox 
                                                title={`${fixture.team1_details.name} Ratings`}
                                                images={images.filter(item=>item.submitted_by == fixture.team2_id && item.field == 'team1_Rating')}
                                                className={clsx({[classes.disable] : loading })}
                                                updateMode={true}
                                            />
                                            

                                            <ImageBox 
                                                title={`${fixture.team2_details.name} Ratings`}
                                                images={images.filter(item=>item.submitted_by == fixture.team2_id && item.field == 'team2_Rating')}
                                                className={clsx({[classes.disable] : loading })}
                                                updateMode={true}
                                            />
                                        </>
                                    }

                                    <ImageUpload 
                                        buttonText='Upload team1 ratings images'
                                        label='ratings1Images'
                                        updateMode={true}
                                        fixture_id={fixture.id}
                                    />
                                    <ImageUpload 
                                        buttonText='Upload team2 ratings images'
                                        label='ratings2Images'
                                        updateMode={true}
                                        fixture_id={fixture.id}
                                    />

                                </Container>
                            </div>
                        }

                        </>

                    }
                    
                </>
            }
        </Container>
    )
}
