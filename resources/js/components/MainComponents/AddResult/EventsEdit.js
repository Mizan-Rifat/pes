import React,{useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import EventTable from './EventTable';
import ImageUpload from '../../CustomComponent/ImageUpload';
import ImageBox from '../../CustomComponent/ImageBox';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

export default function EventsEdit({panel}) {

    const {
        events,
        loading,
    } = useSelector(state => state.events)
    
    const {fixture} = useSelector(state => state.updateResult)
    const {images,loading:imageLoading} = useSelector(state => state.images)

    const {user} = useSelector(state => state.sessionUser)
    const {club,loading:clubLoading} = useSelector(state => state.cuClub)

    
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} className={clsx({'d-none':club.id == fixture.team2_id})}>
                    
                    <EventTable
                        players={fixture.team1_details.players}
                        club={fixture.team1_details}
                        events={events.filter(item=>item.club_id == fixture.team1_details.id)}
                        loading={loading}
                        fixture_id={fixture.id}
                        editable={club.id == fixture.team1_id && (fixture.completed == 0 || fixture.completed == 4)}
                    />
                    
                </Grid>

                <Grid item xs={12} sm={6} className={clsx({'d-none':club.id == fixture.team1_id})}>
                    <EventTable
                        players={fixture.team2_details.players}
                        club={fixture.team2_details}
                        events={events.filter(item=>item.club_id == fixture.team2_details.id)}
                        loading={loading}
                        fixture_id={fixture.id}
                        editable={club.id == fixture.team2_id && (fixture.completed == 0 || fixture.completed == 3)}
                    />
                </Grid>
            
            </Grid>

            

            {
                <>
                    <div className={clsx({'d-none':club.id == fixture.team2_details.id})}>
                        <ImageBox 
                            title={`Events (submitted by ${fixture.team1_details.name})`}
                            images={images.filter(item=>item.submitted_by == fixture.team1_id && item.field == 'event')}
                            updateMode={panel != 'approveresult'}
                        />
                    </div>

                    <div className={clsx({'d-none':club.id == fixture.team1_details.id})}>
                        <ImageBox 
                            title={`Events (submitted by ${fixture.team2_details.name})`}
                            images={images.filter(item=>item.submitted_by == fixture.team2_id && item.field == 'event')}
                            updateMode={panel != 'approveresult'}
                        />
                    </div>

                </> 
            }
            {
                panel != 'approveresult' &&
                
                <div>

                    <ImageUpload 
                        buttonText='Upload Event images'
                        label='eventsImages'
                        fixture_id={fixture.id}
                    />
                </div>

            }
        </>
    )
}

