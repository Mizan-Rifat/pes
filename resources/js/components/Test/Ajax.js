import React,{useState,useEffect} from 'react'




export default function Ajax() {

    const url = `http://127.0.0.1:8000/api/result/add`

    useEffect(() => {
        axios.post(url,{
            fixture_id:11,
            events:[
                {
                    event_id:1,
                    player_id:23,
                    club_id:3,
                    minute:110,

                },
                {
                    event_id:1,
                    player_id:24,
                    club_id:3,
                    minute:1,
                },
            ]
        })
        .then(response=>{
            console.log(response)
        }).catch(error=>{
            console.log(error.response.data)
        })
    }, [])


    return (
        <div>
            
        </div>
    )
}
