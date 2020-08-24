import React,{useState} from 'react'
import { Container, makeStyles } from '@material-ui/core'
import Events from './Events'
import Ratings from './Ratings'
import Teams from './Teams'

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
    }
}))


export default function MatchDetails() {
    const classes  = useStyles();

    const [state, setstate] = useState({
        "result": {
        "team1_events": [
        {
        "id": 30,
        "fixture_id": 1,
        "club_id": 1,
        "event_id": 1,
        "player_id": 6,
        "minute": 10,
        "assist_player_id": 5
        },
        {
        "id": 32,
        "fixture_id": 1,
        "club_id": 1,
        "event_id": 1,
        "player_id": 5,
        "minute": 20,
        "assist_player_id": null
        },
        {
        "id": 34,
        "fixture_id": 1,
        "club_id": 1,
        "event_id": 2,
        "player_id": 8,
        "minute": 30,
        "assist_player_id": null
        }
        ],
        "team2_events": [
        {
        "id": 33,
        "fixture_id": 1,
        "club_id": 10,
        "event_id": 1,
        "player_id": 107,
        "minute": 10,
        "assist_player_id": 103
        }
        ],
        "team1_ratings": [
        {
        "id": 2,
        "player_id": 2,
        "rating": 8,
        "club_id": 1
        },
        {
        "id": 3,
        "player_id": 3,
        "rating": 8,
        "club_id": 1
        },
        {
        "id": 4,
        "player_id": 4,
        "rating": 8,
        "club_id": 1
        },
        {
        "id": 5,
        "player_id": 5,
        "rating": 8,
        "club_id": 1
        },
        {
        "id": 6,
        "player_id": 6,
        "rating": 8,
        "club_id": 1
        },
        {
        "id": 7,
        "player_id": 7,
        "rating": 7,
        "club_id": 1
        },
        {
        "id": 8,
        "player_id": 8,
        "rating": 8,
        "club_id": 1
        },
        {
        "id": 9,
        "player_id": 9,
        "rating": 10,
        "club_id": 1
        },
        {
        "id": 10,
        "player_id": 10,
        "rating": 10,
        "club_id": 1
        },
        {
        "id": 11,
        "player_id": 11,
        "rating": 8,
        "club_id": 1
        }
        ],
        "team2_ratings": [
        {
        "id": 13,
        "player_id": 100,
        "rating": 6,
        "club_id": 10
        },
        {
        "id": 14,
        "player_id": 101,
        "rating": 6,
        "club_id": 10
        },
        {
        "id": 15,
        "player_id": 102,
        "rating": 6,
        "club_id": 10
        },
        {
        "id": 16,
        "player_id": 103,
        "rating": 6,
        "club_id": 10
        },
        {
        "id": 17,
        "player_id": 104,
        "rating": 7,
        "club_id": 10
        },
        {
        "id": 18,
        "player_id": 105,
        "rating": 6,
        "club_id": 10
        },
        {
        "id": 19,
        "player_id": 106,
        "rating": 6,
        "club_id": 10
        },
        {
        "id": 20,
        "player_id": 107,
        "rating": 6,
        "club_id": 10
        },
        {
        "id": 21,
        "player_id": 108,
        "rating": 6,
        "club_id": 10
        },
        {
        "id": 22,
        "player_id": 109,
        "rating": 6,
        "club_id": 10
        },
        {
        "id": 23,
        "player_id": 110,
        "rating": 6,
        "club_id": 10
        }
        ]
        },
        "team1": [
        {
        "id": 1,
        "name": "C. RONALDO",
        "model_id": 4522,
        "position": "LWF",
        "image": "http://127.0.0.1:8000/images/players/4522.png",
        "jersey": 1
        },
        {
        "id": 2,
        "name": "L. MESSI",
        "model_id": 7511,
        "position": "RWF",
        "image": "http://127.0.0.1:8000/images/players/7511.png",
        "jersey": 2
        },
        {
        "id": 3,
        "name": "NEYMAR",
        "model_id": 40352,
        "position": "LWF",
        "image": "http://127.0.0.1:8000/images/players/40352.png",
        "jersey": 3
        },
        {
        "id": 4,
        "name": "S. AGUERO",
        "model_id": 33702,
        "position": "CF",
        "image": "http://127.0.0.1:8000/images/players/33702.png",
        "jersey": 4
        },
        {
        "id": 5,
        "name": "L. SUAREZ",
        "model_id": 34881,
        "position": "CF",
        "image": "http://127.0.0.1:8000/images/players/34881.png",
        "jersey": 5
        },
        {
        "id": 6,
        "name": "E. HAZARD",
        "model_id": 36998,
        "position": "LWF",
        "image": "http://127.0.0.1:8000/images/players/36998.png",
        "jersey": 6
        },
        {
        "id": 7,
        "name": "V. VAN DIJK",
        "model_id": 44840,
        "position": "CB",
        "image": "http://127.0.0.1:8000/images/players/44840.png",
        "jersey": 7
        },
        {
        "id": 8,
        "name": "SERGIO RAMOS",
        "model_id": 7329,
        "position": "CB",
        "image": "http://127.0.0.1:8000/images/players/7329.png",
        "jersey": 8
        },
        {
        "id": 9,
        "name": "PIQUE",
        "model_id": 8639,
        "position": "CB",
        "image": "http://127.0.0.1:8000/images/players/8639.png",
        "jersey": 9
        },
        {
        "id": 11,
        "name": "DAVID DE GEA",
        "model_id": 40571,
        "position": "GK",
        "image": "http://127.0.0.1:8000/images/players/40571.png",
        "jersey": 11
        },
        {
        "id": 446,
        "name": "R. LEWANDOWSKI",
        "model_id": 40002,
        "position": "CF",
        "image": "http://127.0.0.1:8000/images/players/40002.png",
        "jersey": 10
        }
        ],
        "team2": [
        {
        "id": 100,
        "name": "C. RONALDO",
        "model_id": 4522,
        "position": "LWF",
        "image": "http://127.0.0.1:8000/images/players/4522.png",
        "jersey": 1
        },
        {
        "id": 101,
        "name": "L. MESSI",
        "model_id": 7511,
        "position": "RWF",
        "image": "http://127.0.0.1:8000/images/players/7511.png",
        "jersey": 2
        },
        {
        "id": 102,
        "name": "NEYMAR",
        "model_id": 40352,
        "position": "LWF",
        "image": "http://127.0.0.1:8000/images/players/40352.png",
        "jersey": 3
        },
        {
        "id": 103,
        "name": "S. AGUERO",
        "model_id": 33702,
        "position": "CF",
        "image": "http://127.0.0.1:8000/images/players/33702.png",
        "jersey": 4
        },
        {
        "id": 104,
        "name": "L. SUAREZ",
        "model_id": 34881,
        "position": "CF",
        "image": "http://127.0.0.1:8000/images/players/34881.png",
        "jersey": 5
        },
        {
        "id": 105,
        "name": "E. HAZARD",
        "model_id": 36998,
        "position": "LWF",
        "image": "http://127.0.0.1:8000/images/players/36998.png",
        "jersey": 6
        },
        {
        "id": 106,
        "name": "V. VAN DIJK",
        "model_id": 44840,
        "position": "CB",
        "image": "http://127.0.0.1:8000/images/players/44840.png",
        "jersey": 7
        },
        {
        "id": 107,
        "name": "SERGIO RAMOS",
        "model_id": 7329,
        "position": "CB",
        "image": "http://127.0.0.1:8000/images/players/7329.png",
        "jersey": 8
        },
        {
        "id": 108,
        "name": "PIQUE",
        "model_id": 8639,
        "position": "CB",
        "image": "http://127.0.0.1:8000/images/players/8639.png",
        "jersey": 9
        },
        {
        "id": 109,
        "name": "R. LEWANDOWSKI",
        "model_id": 40002,
        "position": "CF",
        "image": "http://127.0.0.1:8000/images/players/40002.png",
        "jersey": 10
        },
        {
        "id": 110,
        "name": "DAVID DE GEA",
        "model_id": 40571,
        "position": "GK",
        "image": "http://127.0.0.1:8000/images/players/40571.png",
        "jersey": 11
        }
        ]
        })


    return (
        <Container>
            <Teams panel='rs'/>
            <Container>
                <Events team1_events={state.result.team1_events} team2_events={state.result.team2_events} />
                <Ratings />
            </Container>
        </Container>
    )
}
