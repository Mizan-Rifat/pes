import React,{useState} from 'react'
import { Grid,makeStyles } from '@material-ui/core'
import { ListGroupItem1,ListGroupItem2 } from '@customComponent/ListGroupItem'
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import { FootballIcon,RedCardIcon,AssistIcon,YellowCardIcon } from '@customComponent/Icons';


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
    }
}))


export default function Events() {
    const classes  = useStyles();
    const [state, setstate] = useState({
        "team1_events": [
        {
        "id": 30,
        "fixture_id": 1,
        "club_id": 1,
        "event_id": 1,
        "player_id": 6,
        "player": {
        "id": 6,
        "name": "E. HAZARD",
        "model_id": 36998,
        "position": "LWF",
        "image": "http://127.0.0.1:8000/images/players/36998.png",
        "jersey": 6
        },
        "minute": 10,
        "assist_player_id": null,
        "assist_player": null
        },
        {
        "id": 32,
        "fixture_id": 1,
        "club_id": 1,
        "event_id": 1,
        "player_id": 5,
        "player": {
        "id": 5,
        "name": "L. SUAREZ",
        "model_id": 34881,
        "position": "CF",
        "image": "http://127.0.0.1:8000/images/players/34881.png",
        "jersey": 5
        },
        "minute": 20,
        "assist_player_id": 2,
        "assist_player": {
        "id": 2,
        "name": "L. MESSI",
        "model_id": 7511,
        "position": "RWF",
        "image": "http://127.0.0.1:8000/images/players/7511.png",
        "jersey": 2
        }
        },
        {
        "id": 34,
        "fixture_id": 1,
        "club_id": 1,
        "event_id": 2,
        "player_id": 8,
        "player": {
        "id": 8,
        "name": "SERGIO RAMOS",
        "model_id": 7329,
        "position": "CB",
        "image": "http://127.0.0.1:8000/images/players/7329.png",
        "jersey": 8
        },
        "minute": 30,
        "assist_player_id": null,
        "assist_player": null
        }
        ],
        "team2_events": [
        {
        "id": 33,
        "fixture_id": 1,
        "club_id": 10,
        "event_id": 1,
        "player_id": 107,
        "player": {
        "id": 107,
        "name": "SERGIO RAMOS",
        "model_id": 7329,
        "position": "CB",
        "image": "http://127.0.0.1:8000/images/players/7329.png",
        "jersey": 8
        },
        "minute": 10,
        "assist_player_id": 103,
        "assist_player": {
        "id": 103,
        "name": "S. AGUERO",
        "model_id": 33702,
        "position": "CF",
        "image": "http://127.0.0.1:8000/images/players/33702.png",
        "jersey": 4
        }
        }
        ],
        "team1_ratings": [
        {
        "id": 2,
        "player_id": 2,
        "player": {
        "id": 2,
        "name": "L. MESSI",
        "model_id": 7511,
        "position": "RWF",
        "image": "http://127.0.0.1:8000/images/players/7511.png",
        "jersey": 2
        },
        "rating": 8,
        "club_id": 1
        },
        {
        "id": 3,
        "player_id": 3,
        "player": {
        "id": 3,
        "name": "NEYMAR",
        "model_id": 40352,
        "position": "LWF",
        "image": "http://127.0.0.1:8000/images/players/40352.png",
        "jersey": 3
        },
        "rating": 8,
        "club_id": 1
        },
        {
        "id": 4,
        "player_id": 4,
        "player": {
        "id": 4,
        "name": "S. AGUERO",
        "model_id": 33702,
        "position": "CF",
        "image": "http://127.0.0.1:8000/images/players/33702.png",
        "jersey": 4
        },
        "rating": 8,
        "club_id": 1
        },
        {
        "id": 5,
        "player_id": 5,
        "player": {
        "id": 5,
        "name": "L. SUAREZ",
        "model_id": 34881,
        "position": "CF",
        "image": "http://127.0.0.1:8000/images/players/34881.png",
        "jersey": 5
        },
        "rating": 8,
        "club_id": 1
        },
        {
        "id": 6,
        "player_id": 6,
        "player": {
        "id": 6,
        "name": "E. HAZARD",
        "model_id": 36998,
        "position": "LWF",
        "image": "http://127.0.0.1:8000/images/players/36998.png",
        "jersey": 6
        },
        "rating": 8,
        "club_id": 1
        },
        {
        "id": 7,
        "player_id": 7,
        "player": {
        "id": 7,
        "name": "V. VAN DIJK",
        "model_id": 44840,
        "position": "CB",
        "image": "http://127.0.0.1:8000/images/players/44840.png",
        "jersey": 7
        },
        "rating": 7,
        "club_id": 1
        },
        {
        "id": 8,
        "player_id": 8,
        "player": {
        "id": 8,
        "name": "SERGIO RAMOS",
        "model_id": 7329,
        "position": "CB",
        "image": "http://127.0.0.1:8000/images/players/7329.png",
        "jersey": 8
        },
        "rating": 8,
        "club_id": 1
        },
        {
        "id": 9,
        "player_id": 9,
        "player": {
        "id": 9,
        "name": "PIQUE",
        "model_id": 8639,
        "position": "CB",
        "image": "http://127.0.0.1:8000/images/players/8639.png",
        "jersey": 9
        },
        "rating": 10,
        "club_id": 1
        },
        {
        "id": 10,
        "player_id": 10,
        "player": null,
        "rating": 10,
        "club_id": 1
        },
        {
        "id": 11,
        "player_id": 11,
        "player": {
        "id": 11,
        "name": "DAVID DE GEA",
        "model_id": 40571,
        "position": "GK",
        "image": "http://127.0.0.1:8000/images/players/40571.png",
        "jersey": 11
        },
        "rating": 8,
        "club_id": 1
        }
        ],
        "team2_ratings": [
        {
        "id": 13,
        "player_id": 100,
        "player": {
        "id": 100,
        "name": "C. RONALDO",
        "model_id": 4522,
        "position": "LWF",
        "image": "http://127.0.0.1:8000/images/players/4522.png",
        "jersey": 1
        },
        "rating": 6,
        "club_id": 10
        },
        {
        "id": 14,
        "player_id": 101,
        "player": {
        "id": 101,
        "name": "L. MESSI",
        "model_id": 7511,
        "position": "RWF",
        "image": "http://127.0.0.1:8000/images/players/7511.png",
        "jersey": 2
        },
        "rating": 6,
        "club_id": 10
        },
        {
        "id": 15,
        "player_id": 102,
        "player": {
        "id": 102,
        "name": "NEYMAR",
        "model_id": 40352,
        "position": "LWF",
        "image": "http://127.0.0.1:8000/images/players/40352.png",
        "jersey": 3
        },
        "rating": 6,
        "club_id": 10
        },
        {
        "id": 16,
        "player_id": 103,
        "player": {
        "id": 103,
        "name": "S. AGUERO",
        "model_id": 33702,
        "position": "CF",
        "image": "http://127.0.0.1:8000/images/players/33702.png",
        "jersey": 4
        },
        "rating": 6,
        "club_id": 10
        },
        {
        "id": 17,
        "player_id": 104,
        "player": {
        "id": 104,
        "name": "L. SUAREZ",
        "model_id": 34881,
        "position": "CF",
        "image": "http://127.0.0.1:8000/images/players/34881.png",
        "jersey": 5
        },
        "rating": 7,
        "club_id": 10
        },
        {
        "id": 18,
        "player_id": 105,
        "player": {
        "id": 105,
        "name": "E. HAZARD",
        "model_id": 36998,
        "position": "LWF",
        "image": "http://127.0.0.1:8000/images/players/36998.png",
        "jersey": 6
        },
        "rating": 6,
        "club_id": 10
        },
        {
        "id": 19,
        "player_id": 106,
        "player": {
        "id": 106,
        "name": "V. VAN DIJK",
        "model_id": 44840,
        "position": "CB",
        "image": "http://127.0.0.1:8000/images/players/44840.png",
        "jersey": 7
        },
        "rating": 6,
        "club_id": 10
        },
        {
        "id": 20,
        "player_id": 107,
        "player": {
        "id": 107,
        "name": "SERGIO RAMOS",
        "model_id": 7329,
        "position": "CB",
        "image": "http://127.0.0.1:8000/images/players/7329.png",
        "jersey": 8
        },
        "rating": 6,
        "club_id": 10
        },
        {
        "id": 21,
        "player_id": 108,
        "player": {
        "id": 108,
        "name": "PIQUE",
        "model_id": 8639,
        "position": "CB",
        "image": "http://127.0.0.1:8000/images/players/8639.png",
        "jersey": 9
        },
        "rating": 6,
        "club_id": 10
        },
        {
        "id": 22,
        "player_id": 109,
        "player": {
        "id": 109,
        "name": "R. LEWANDOWSKI",
        "model_id": 40002,
        "position": "CF",
        "image": "http://127.0.0.1:8000/images/players/40002.png",
        "jersey": 10
        },
        "rating": 6,
        "club_id": 10
        },
        {
        "id": 23,
        "player_id": 110,
        "player": {
        "id": 110,
        "name": "DAVID DE GEA",
        "model_id": 40571,
        "position": "GK",
        "image": "http://127.0.0.1:8000/images/players/40571.png",
        "jersey": 11
        },
        "rating": 6,
        "club_id": 10
        }
        ]
        })


    return (
        
        <Grid container spacing={3} className={classes.container}>
            <Grid item sm={4} >
                <div>
                {
                    state.team1_events.map((event,index)=>(
                        <SingleEvent key={index} event={event} team={1} />
                    ))
                }
                </div>
            </Grid>

            <Grid item sm={4} >
                
            </Grid>

            <Grid item sm={4}>
                <div>
                {
                    state.team2_events.map((event,index)=>(
                        <SingleEvent key={index} event={event} team={2} />
                    ))
                }
                </div>
            </Grid>
        
        </Grid>
    
    )
}

function SingleEvent({event,team}){

    const iconStyle = {
        fontSize:'14px',
        margin:'0 5px'
    }

    const icon = (event_id)=>{
        switch (event_id) {
            case 1:
                return <FootballIcon style={iconStyle} />
                break;
            case 2:
                return <YellowCardIcon style={iconStyle}/>
                break;
            case 3:
                return <RedCardIcon style={iconStyle}/>
                break;
            
            default:
                break;
        }
    }
    return(
        <div>
            {
                team == 1 ?
                    <>

                        <ListGroupItem1 
                            icon={icon(event.event_id)}
                            label={`${event.player.name} (${event.minute})`}
                            containerStyle={{
                                height: event.assist_player_id != null ? '20px' : '30px',
                                fontSize:'12px',
                            }}
                        />

                        {
            
                            event.assist_player_id != null &&
                                <ListGroupItem1 
                                    icon={<AssistIcon style={iconStyle} />}
                                    label={`${event.assist_player.name}`}
                                    containerStyle={{
                                        height:'20px',
                                        fontSize:'12px',
                                        marginLeft:'15px'
                                    }}
                                /> 
                        }

                    </>
                    :
                    <>
                        <ListGroupItem2 
                            icon={icon(event.event_id)}
                            label={`${event.player.name} (${event.minute})  `}
                            containerStyle={{
                                height: event.assist_player_id != null ? '20px' : '30px',
                                fontSize:'12px',
                                justifyContent:'flex-end'
                            }}
                        />

                        {
            
                            event.assist_player_id != null &&
                                <ListGroupItem2 
                                    icon={<AssistIcon style={iconStyle} />}
                                    label={`${event.assist_player.name}`}
                                    containerStyle={{
                                        height:'20px',
                                        fontSize:'12px',
                                        marginRight:'15px',
                                        justifyContent:'flex-end'
                                    }}
                                /> 
                        }
                    </>

            }
            
        </div>
    )
}