import React, { useState } from 'react'
import {TextField,Select,MenuItem,FormControl,Button} from '@material-ui/core'

export default function Events({state, setstate}) {

    

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
    return (
        <table className="table table-striped">
            
                
                    <SingleEvent players={players} mainState={state} setMainState={setstate}/>
                
        
        </table>
    )
}


function SingleEvent({players,mainState, setMainState}){
    const [state, setState] = useState({
        event: 1,
        player: 0,
        minute: '',
        assistPlayer: 0
    })
    const eventHandleChange = (e) => {
        setState({ ...state, event: e.target.value })
        setMainState({
            ...mainState,
            
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
                <TextField id="Minute" label="Minute" type="search" value={state.minute} onChange={minuteHandleChange} />
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
            <td>
                <Button variant='contained' color='primary'>ok</Button>
            </td>
        </tr>
    )
}