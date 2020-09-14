import React,{useState, useEffect} from 'react'
import { Grid,makeStyles } from '@material-ui/core'
import Mtable from '@customComponent/Mtable'
import { MTableToolbar } from 'material-table';
import { useDispatch } from 'react-redux';
import { addRatingToState, updateRatingToState, ratingsUpdated, updateRatings } from '../../Redux/actions/resultAddAction';
import clsx from 'clsx';
import { editableRatingsTableColumns } from '../../CData/table';

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

export default function RatingsEdit({team1_players,team2_players,team1_id,team2_id,ratings,className,fixture_id,loading,updateMode,editable}) {

    const classes  = useStyles();
   
    return (
        <Grid container spacing={3} className={clsx(classes.container,className)} >
            <Grid item sm={4} >
                
                <RatingsTable 
                   players={team1_players}
                   club_id={team1_id}
                   team={1}
                   ratings={ratings.filter(item=>item.club_id == team1_id)}
                   fixture_id={fixture_id}
                   updateMode={updateMode}
                   editable={editable}
                />
            </Grid>

            <Grid item sm={4} >
                
            </Grid>

            <Grid item sm={4}>
                <RatingsTable 
                    players={team2_players}
                    club_id={team2_id}
                    team={2}
                    ratings={ratings.filter(item=>item.club_id == team2_id)}
                    fixture_id={fixture_id}
                    updateMode={updateMode}
                    editable={editable}
                />
            </Grid>

            
        
        </Grid>
    )
}

function RatingsTable({players,club_id,team,ratings,fixture_id,updateMode,editable}){

    const dispatch = useDispatch();

    const columns = editableRatingsTableColumns(players);

    const handleBulkUpdate = (changes) => (

        new Promise((resolve,reject)=>{
         
            const updatedData = ratings.map((item,index)=>(
                Object.keys(changes).includes(index.toString()) ? 
                    changes[index].newData
                    :
                    item
            ))

            if(updateMode){
                dispatch(updateRatings({fixture_id,ratings:updatedData}))
            }else{
                updatedData.map(item=>{
                    dispatch(ratingsUpdated(item))    
                })
            }
            resolve();
  
        })
    )

    useEffect(()=>{

        if(ratings.length == 0){
            const newData = players.map((player,index)=>({
                id:team == 2 ? index + 30  : index,
                player_id:player.id,
                rating:0,
                club_id,
                fixture_id
            }))
    
            dispatch(addRatingToState(newData))
        }

    },[])




    const classes  = useStyles();

    return(

        <Mtable 
            columns={columns}
            data={ratings}
            search={false}
            title='Ratings'
            handleBulkUpdate={editable ? handleBulkUpdate : false }
            header={{padding:'8px'}}
            edit={true}
            sorting={false}
            components={{
                Toolbar: props => (

                  <div className='detailTable'>
                      <MTableToolbar {...props} classes={{root:classes.toolbar}} />
                  </div>
                  
                ),
              }}
        
        />
    )
}
