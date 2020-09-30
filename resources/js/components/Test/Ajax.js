import React,{useState,useEffect} from 'react'
import { Button } from '@material-ui/core'




export default function Ajax() {

    const url = `http://127.0.0.1:8000/api/resulttest`
    const [state, setstate] = useState('')
    const data = {
        ratings:[
            {
                player_id:1,
                club_id:1,
                rating:10,
            },
            {
                player_id:1,
                club_id:1,
                rating:10,
            },
            {
                player_id:1,
                club_id:1,
                rating:10,
            },
        ],
        events:[
            {
                'player_id' : 1, 
                'event_id' : 1,
                'club_id' : 1, 
            'minute' :  10,
                'assist_player_id' : null,
            },
            {
                'player_id' : 2, 
                'event_id' : 2,
                'club_id' : 1, 
                'minute' :  20,
                'assist_player_id' : null,
            },
        ],
        fixture_id:1
    }
    
    
    
    useEffect(() => {
        axios.post(url,data)
        .then(response=>{
            console.log(response.data)
            setstate(response)
        }).catch(error=>{
            console.log(error.response.data)
        })
    }, [])
    
    // useEffect(() => {
    //     axios.get('/api/test')
    //     .then(response=>{
    //         console.log(response.data)
    //         setstate(response)
    //     }).catch(error=>{
    //         console.log(error.response.data)
    //     })
    // }, [])


    return (
        <div>
            {JSON.stringify(state)}
        </div>
     )
}
