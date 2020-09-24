import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core';

export default function Restricted({msg,home}) {

    const history = useHistory();

    return (
        
        <div style={{textAlign:'center',marginTop:'20%'}}>
            <h5>{msg}</h5>
            {
                home ? 
                    <Button variant='contained' color='secondary' onClick={()=>history.push('/')} className='my-4' >
                        Home
                    </Button>
                :
                    <Button variant='contained' color='secondary' onClick={()=>history.goBack()} className='my-4' >
                        Go Back
                    </Button>
            }

        </div>
    )
}
