import React,{useState,useEffect} from 'react'
import { Button } from '@material-ui/core'




export default function Ajax() {

    const url = `http://127.0.0.1:8000/api/tournament/details?slug=premierleague`
    const [state, setstate] = useState('')
    useEffect(() => {
        axios.get(url)
        .then(response=>{
            console.log(response.data)
            setstate(response)
        }).catch(error=>{
            console.log(error.response.data)
        })
    }, [])


    return (
        <div>
            {JSON.stringify(state)}
        </div>
     )
}
