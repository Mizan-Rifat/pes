import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core';

export default function LoginRequired() {

    const history = useHistory();

    return (
        
        <div style={{textAlign:'center',marginTop:'20%'}}>
            <h5>{msg}</h5>
            <Button variant='contained' color='secondary' onClick={()=>history.goBack()} className='my-4' >
                Go Back
            </Button>
        </div>
    )
}
