import React,{useState, useEffect} from 'react'
import { Grid,makeStyles } from '@material-ui/core'
import Mtable from '@customComponent/Mtable'
import { MTableToolbar } from 'material-table';


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

export default function RatingsEdit({team1_players,team2_players}) {

    const classes  = useStyles();

    return (
        <Grid container spacing={3} className={classes.container}>
            <Grid item sm={6} >
                
                <RatingsTable 
                   players={team1_players}
                
                />
            </Grid>

            <Grid item sm={6}>
                <RatingsTable 
                    players={team2_players}
                    />
            </Grid>
        
        </Grid>
    )
}

function RatingsTable({players}){

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

    const [data, setdata] = useState([])


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

    const handleBulkUpdate = (newData) => (

        new Promise((resolve,reject)=>{
            console.log(newData)
            resolve();
        //     dispatch(updateFixture(newData))
        //     .then(response=>{
        //         toast(response,'success')
        //         resolve();
        //     }).catch(error=>{
               
        //         Object.keys(error).map(err=>{
        //             toast(error[err],'error')
        //         })
        //         reject();
        //     })
        })
    )
        useEffect(()=>{
            const newData = players.map(player=>({
                player_id:player.id,
                rating:0
            }))

            setdata(newData)
        },[])


    const classes  = useStyles();

    return(
        <Mtable 
            columns={columns}
            data={data}
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
