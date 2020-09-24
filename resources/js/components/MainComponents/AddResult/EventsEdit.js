import React,{useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import EventTable from './EventTable';
import ImageUpload from '../../CustomComponent/ImageUpload';
import ImageBox from '../ApproveResult.js/ImageBox';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

export default function EventsEdit({panel}) {

    const {
        fixture,
        events,
        images,
        eventsImages,
        ratings1Images,
        ratings2Images,
        eventKey,
        ratingKey,
        loading,
        fetching
    } = useSelector(state => state.addResult)

    const {user} = useSelector(state => state.session)

    const [updateMode, setUpdateMode] = useState(false)
    const [editable, setEditable] = useState(false)

    useEffect(()=>{
        if(panel == 'updateresult'){
            setUpdateMode(true)
            setEditable(true)
        }
        if(panel == 'addresult'){
            setUpdateMode(false)
            setEditable(true)
        }
        if(panel == 'approveresult'){
            setUpdateMode(false)
            setEditable(false)
        }
    },[panel])
    
  

    return (
        <>
            <Grid container spacing={3} className={clsx({'d-none':user.club.id == fixture.team2_details.id})}>
                <Grid item xs={12} sm={6} >
                    
                    <EventTable 
                        players={fixture.team1_details.players}
                        club_id={fixture.team1_details.id}
                        events={events.filter(item=>item.club_id == fixture.team1_details.id)}
                        loading={loading}
                        team={1}
                        fixture_id={fixture.id}
                        eventKey={eventKey}
                        updateMode={updateMode}
                        editable={editable}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <EventTable 
                        players={fixture.team2_details.players}
                        club_id={fixture.team2_details.id}
                        events={events.filter(item=>item.club_id == fixture.team2_details.id)}
                        loading={loading}
                        team={2}
                        fixture_id={fixture.id}
                        eventKey={eventKey}
                        updateMode={updateMode}
                        editable={editable}
                    />
                </Grid>
            
            </Grid>

            

            {
                panel != 'addresult' &&
                <>
                    <div className={clsx({'d-none':user.club.id == fixture.team2_details.id})}>
                        <ImageBox 
                            title={`Events (submitted by ${fixture.team1_details.name})`}
                            images={images.filter(item=>item.submitted_by == fixture.team1_id && item.field == 'event')}
                            updateMode={updateMode}
                        />
                    </div>

                    <div className={clsx({'d-none':user.club.id == fixture.team1_details.id})}>
                        <ImageBox 
                            title={`Events (submitted by ${fixture.team2_details.name})`}
                            images={images.filter(item=>item.submitted_by == fixture.team2_id && item.field == 'event')}
                            updateMode={updateMode}
                        />
                    </div>

                </> 
            }
            {
                panel != 'approveresult' &&

                <ImageUpload 
                    buttonText='Upload Event images'
                    label='eventsImages'
                    updateMode={updateMode}
                    fixture_id={fixture.id}
                />
            }
        </>
    )
}

