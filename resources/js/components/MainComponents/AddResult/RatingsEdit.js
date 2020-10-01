import React,{useState, useEffect} from 'react'
import { Grid,makeStyles } from '@material-ui/core'
import Mtable from '@customComponent/Mtable'
import { MTableToolbar } from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { addRatingToState, updateRatingToState, ratingsUpdated, updateRatings } from '../../Redux/actions/resultAddAction';
import clsx from 'clsx';
import { editableRatingsTableColumns } from '../../CData/table';
import ImageUpload from '../../CustomComponent/ImageUpload';
import ImageBox from '../ApproveResult.js/ImageBox';
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
    
    const {
        fixture,
    } = useSelector(state => state.addResult)

    const {user} = useSelector(state => state.sessionUser)
    const dispatch = useDispatch();

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
            <Grid container spacing={3} className={clsx(classes.container,{'d-none':user.club.id == fixture.team2_details.id})} justify='space-between'>
                <Grid item xs={12} sm={4} >
                    
                    <RatingsTable 
                        players={fixture.team1_details.players}
                        club_id={fixture.team1_details.id}
                        team={1}
                        ratings={ratings.filter(item=>item.club_id == fixture.team1_details.id)}
                        fixture_id={fixture.id}
                        updateMode={updateMode}
                        editable={editable}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <RatingsTable 
                        players={fixture.team2_details.players}
                        club_id={fixture.team2_details.id}
                        team={2}
                        ratings={ratings.filter(item=>item.club_id == fixture.team2_details.id)}
                        fixture_id={fixture.id}
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
                        title={`${fixture.team1_details.name} Ratings (sumitted by ${fixture.team1_details.name})`}
                        images={images.filter(item=>item.submitted_by == fixture.team1_id && item.field == 'team1_Rating')}
                        updateMode={updateMode}
                    />
                </div>
                
                <div className={clsx({'d-none':user.club.id == fixture.team1_details.id})}>
                    <ImageBox 
                        title={`${fixture.team1_details.name} Ratings (sumitted by ${fixture.team2_details.name})`}
                        images={images.filter(item=>item.submitted_by == fixture.team2_id && item.field == 'team1_Rating')}
                        updateMode={updateMode}
                    />
                </div>

                <div className={clsx({'d-none':user.club.id == fixture.team2_details.id})}>
                    <ImageBox 
                        title={`${fixture.team2_details.name} Ratings (sumitted by ${fixture.team1_details.name})`}
                        images={images.filter(item=>item.submitted_by == fixture.team1_id && item.field == 'team2_Rating')}
                        updateMode={updateMode}
                    />
                </div>

                <div className={clsx({'d-none':user.club.id == fixture.team1_details.id})}>
                    <ImageBox 
                        title={`${fixture.team2_details.name} Ratings (sumitted by ${fixture.team2_details.name})`}
                        images={images.filter(item=>item.submitted_by == fixture.team2_id && item.field == 'team2_Rating')}
                        updateMode={updateMode}
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
                        updateMode={updateMode}
                        fixture_id={fixture.id}
                    />

                    <ImageUpload 
                        buttonText={`Upload ${fixture.team2_details.name} rating images`}
                        label='ratings2Images'
                        updateMode={updateMode}
                        fixture_id={fixture.id}
                    />
                </>
            }
        </>
    )
}

