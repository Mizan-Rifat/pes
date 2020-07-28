import React, { useState,useContext } from 'react'
import {TextField,Select,MenuItem,FormControl,Button} from '@material-ui/core'
import {MyContext} from '../Result';


export default function Events({teamNo}) {


    const [events, setevents] = useState([]);
    const [players, setplayers] = useState([
        {
            name:'player1',
            id:1
        },
        {
            name:'player2',
            id:2
        },
        {
            name:'player3',
            id:3
        },
        {
            name:'player4',
            id:4
        },
    ]);

    const addEvent =()=>{
        setevents([
            ...events,1
        ])
    }
 
    return (
        <div>
            <Button variant='contained' color='primary' onClick={addEvent}>Add</Button>

            <table className="table table-striped">
                
                    {
                        events.map((item,index)=>(
                            <SingleEvent players={players} index={index} key={index} teamNo={teamNo}/>
                        ))
                    }
                        
                    
            
            </table>
        </div>
    )
}


function SingleEvent({players,index,teamNo}){

    const {context,dispatch} = useContext(MyContext);

    const [state, setState] = useState({
        event: 1,
        player: 0,
        minute: '',
        assistPlayer: 0
    })
    const eventHandleChange = (e) => {
        setState({ ...state, event: e.target.value })
        dispatch({
            type:'EVENT_ID_CHANGE',
            payload:{
                teamNo,
                index
            }
        })
    }
    const playerHandleChange = (e) => {
        setState({ ...state, player: e.target.value })
    }
    const assistPlayerHandleChange = (e) => {
        setState({ ...state, assistPlayer: e.target.value })
    }
    const minuteHandleChange = (e) => {
        setState({ ...state, minute: e.target.value })
    }
    return(
        <tr>
            <td>
                <FormControl>
                    <Select value={state.event} onChange={eventHandleChange} displayEmpty>
                        <MenuItem value="">
                            None
                        </MenuItem>
                        <MenuItem value={1}>Goal</MenuItem>
                        <MenuItem value={2}>Yellow Card</MenuItem>
                        <MenuItem value={3}>Red Card</MenuItem>
                    </Select>
                </FormControl>
            </td>

            <td>
                <FormControl>
                    <Select value={state.player} onChange={playerHandleChange} displayEmpty>
                        <MenuItem value={0}>None</MenuItem>
                        {
                            players.map((player, index) => (
                                <MenuItem key={index} value={player.id}>{player.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </td>

            <td>
                <input value={state.minute} onChange={minuteHandleChange} placeholder='minute'/>
                
            </td>

            <td>
                <FormControl>
                    <Select value={state.assistPlayer} onChange={assistPlayerHandleChange} displayEmpty>
                        <MenuItem value={0}>None</MenuItem>
                        {
                            players.map((player) => (
                                <MenuItem value={player.id}>{player.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </td>
            
        </tr>
    )
}