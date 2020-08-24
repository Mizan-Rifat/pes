import React,{useState,useEffect} from 'react'




export default function Ajax() {

    const url = `http://127.0.0.1:8000/api/test`
    useEffect(() => {
        axios.get(url)
        .then(response=>{
            console.log(response)
        }).catch(error=>{
            console.log(error)
        })
    }, [])


    return (
        <div>
            
        </div>
    )
}
