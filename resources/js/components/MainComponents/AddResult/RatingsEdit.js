import React,{useState, useEffect} from 'react'
import { Grid,makeStyles } from '@material-ui/core'
import Mtable from '@customComponent/Mtable'
import { MTableToolbar } from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { addRatingToState, updateRatingToState, ratingsUpdated, updateRatings } from '../../Redux/actions/resultAddAction';
import clsx from 'clsx';
import { editableRatingsTableColumns } from '../../CData/table';
import ImageUpload from '../../CustomComponent/ImageUpload';
import ImageBox from '../../CustomComponent/ImageBox';
import RatingsTable from './RatingsTable'

const useStyles = makeStyles(theme=>({
    container:{
        // boxShadow:'0 6px 12px rgba(0,0,0,.1)',
        marginTop:'30px',
    },
    listItemContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    toolbar:{
        padding:'0 !important',
        minHeight:'unset'
        
    },
}))

export default function RatingsEdit({panel}) {

    const classes  = useStyles();

    const {
        ratings,
        loading,
        fetching
    } = useSelector(state => state.ratings)

    const {user} = useSelector(state => state.sessionUser)
    const {club,loading:clubLoading} = useSelector(state => state.cuClub)
    
    const {images,loading:imageLoading} = useSelector(state => state.images)
    
    const {
        fixture,
    } = useSelector(state => state.updateResult)

    const dispatch = useDispatch();

    
   
    return (
        // !fetching &&
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} className={clsx({'d-none':club.id == fixture.team2_id})}>
                    
                    <RatingsTable 
                        players={fixture.team1_details.players}
                        club={fixture.team1_details}
                        team={1}
                        ratings={ratings.filter(item=>item.club_id == fixture.team1_details.id)}
                        fixture_id={fixture.id}
                        editable={club.id == fixture.team1_id && (fixture.completed == 0 || fixture.completed == 4)}
                    />
                </Grid>

                <Grid item xs={12} sm={6} className={clsx({'d-none':club.id == fixture.team1_id})}>
                    <RatingsTable 
                        players={fixture.team2_details.players}
                        club={fixture.team2_details}
                        team={2}
                        ratings={ratings.filter(item=>item.club_id == fixture.team2_details.id)}
                        fixture_id={fixture.id}
                        editable={club.id == fixture.team1_id && (fixture.completed == 0 || fixture.completed == 3)}
                    />
                </Grid>
            
            </Grid>

            {

            <>
                <div className={clsx({'d-none':club.id == fixture.team2_details.id})}>
                    <ImageBox 
                        title={`${fixture.team1_details.name} Ratings (sumitted by ${fixture.team1_details.name})`}
                        images={images.filter(item=>item.submitted_by == fixture.team1_id && item.field == 'team1_Rating')}
                        updateMode={panel != 'approveresult'}
                    />
                </div>
                
                <div className={clsx({'d-none':club.id == fixture.team1_details.id})}>
                    <ImageBox 
                        title={`${fixture.team1_details.name} Ratings (sumitted by ${fixture.team2_details.name})`}
                        images={images.filter(item=>item.submitted_by == fixture.team2_id && item.field == 'team1_Rating')}
                        updateMode={panel != 'approveresult'}
                    />
                </div>

                <div className={clsx({'d-none':club.id == fixture.team2_details.id})}>
                    <ImageBox 
                        title={`${fixture.team2_details.name} Ratings (sumitted by ${fixture.team1_details.name})`}
                        images={images.filter(item=>item.submitted_by == fixture.team1_id && item.field == 'team2_Rating')}
                        updateMode={panel != 'approveresult'}
                    />
                </div>

                <div className={clsx({'d-none':club.id == fixture.team1_details.id})}>
                    <ImageBox 
                        title={`${fixture.team2_details.name} Ratings (sumitted by ${fixture.team2_details.name})`}
                        images={images.filter(item=>item.submitted_by == fixture.team2_id && item.field == 'team2_Rating')}
                        updateMode={panel != 'approveresult'}
                    />
                </div>
            </>
            }
            {
                panel != 'approveresult' &&

                <>
                    <ImageUpload 
                        buttonText={`Upload ${fixture.team1_details.name} rating images`}
                        label='ratings1Images'
                        fixture_id={fixture.id}
                    />

                    <ImageUpload 
                        buttonText={`Upload ${fixture.team2_details.name} rating images`}
                        label='ratings2Images'
                        fixture_id={fixture.id}
                    />
                </>
            }
        </>
    )
}

