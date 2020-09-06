import React,{useState, useEffect} from 'react'
import { Grid,makeStyles } from '@material-ui/core'
import Mtable from '@customComponent/Mtable'
import { MTableToolbar } from 'material-table';
import { useDispatch } from 'react-redux';
import { addRatingToState, updateRatingToState } from '../../Redux/actions/resultAddAction';
import clsx from 'clsx';

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

export default function RatingsEdit({team1_players,team2_players,team1_id,team2_id,ratings,className}) {

    const classes  = useStyles();

    return (
        <Grid container spacing={3} className={clsx(classes.container,className)} >
            <Grid item sm={6} >
                
                <RatingsTable 
                   players={team1_players}
                   club_id={team1_id}
                   team={1}
                   ratings={ratings.team1}
                
                />
            </Grid>

            <Grid item sm={6}>
                <RatingsTable 
                    players={team2_players}
                    club_id={team2_id}
                    team={2}
                    ratings={ratings.team2}
                    />
            </Grid>
        
        </Grid>
    )
}

function RatingsTable({players,club_id,team,ratings}){

    const dispatch = useDispatch();

    const playerLookup = (players) =>{
        const obj = {};
        players.map(player=>{
            obj[player.id] = player.name
        })
        return obj;
    }
    const ratingLookup = () =>{
        const obj = {};
        for (let index = 0; index < 11; index++) {
            obj[index] = index
            
        }
        return obj;
    }



    const [columns,setColumns] = useState([
        {
            title:'Player',
            field:'player_id',
            lookup:playerLookup(players),
            cellStyle:{
                padding:'8px',
                fontSize:'12px',
                textAlign:'center'
                
            },
            headerStyle:{
                textAlign:'center'
            },
            editable:'never'
        },
        {
            title:'Rating',
            field:'rating',
            lookup:ratingLookup(),
            cellStyle:{
                padding:'8px',
                fontSize:'12px',
                textAlign:'center'
                
            },
            headerStyle:{
                textAlign:'center'
            },
        },
    ])

    const handleBulkUpdate = (changes) => (

        new Promise((resolve,reject)=>{
         
        console.log({changes})
            const updatedData = ratings.map((item,index)=>(
                Object.keys(changes).includes(index.toString()) ? 
                    changes[index].newData
                    :
                    item
            ))
          
            dispatch(addRatingToState(updatedData,team))
            resolve();
  
        })
    )

    useEffect(()=>{

        const newData = players.map(player=>({
            player_id:player.id,
            rating:0,
            club_id
        }))

        dispatch(addRatingToState(newData,team))

    },[])





    const classes  = useStyles();

    return(
        <Mtable 
            columns={columns}
            data={ratings}
            search={false}
            title='Ratings'
            handleBulkUpdate={handleBulkUpdate}
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