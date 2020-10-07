import React,{useState, useEffect} from 'react'
import { Button, makeStyles, TextField } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { rejectResult } from '../../Redux/Ducks/UpdateResultDuck';
import Notify from '@customComponent/Notify';


const useStyles = makeStyles(theme=>({

}))

export default function RejectResult({fixture,club}) {

    const classes = useStyles();
    const [state, setstate] = useState(false)
    const [msg, setmsg] = useState('')
    const toast = Notify();

    const dispatch = useDispatch();

    const handleReject = () =>{
        const data = {
            'fixture_id':fixture.id,
            'club_id':club.id,
            'message':msg,
        }
        dispatch(rejectResult(data))
        .then(response=>{
            toast(response,'success')
        })
        .catch(error=>{
            console.log({error})
            toast(error.message,'error')
        })
    }

    return (
        <div className='py-3'>

            <Button 
                variant='contained' 
                color='primary' 
                onClick={()=>setstate(!state)}
            >
                Reject {club.name} Result
            </Button>

            {
                state &&
            
                <>
                    <div className='py-3'>
                        <TextField
                            id="outlined-multiline-static"
                            label="Message"
                            multiline
                            rows={2}
                            variant="outlined"
                            fullWidth
                            value={msg}
                            onChange={(e)=>setmsg(e.target.value)}
                        />
                    </div>
                    <div className='text-right'>
                        <Button 
                            variant='contained' 
                            color='secondary' 
                            onClick={handleReject}
                            disabled={fixture}
                            
                        >
                            Reject
                        </Button>
                    </div>
                </>
            }
            
        </div>
    )
}
