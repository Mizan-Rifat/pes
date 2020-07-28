import React, { useState } from 'react'
import {Grid, TextField} from '@material-ui/core';
import Events from './events/Events';


export default function Result() {

    const [state, setstate] = useState({
        team1:{},
        team2:{}
    })
    return (
        <Grid container spacing={3}>
            <Grid item md={4}>
                
                <SingleComp teamNo={1} state={state} setstate={setstate}/>
                <Events state={state} setstate={setstate} />
            </Grid>
            <Grid item md={4}>
                
            </Grid>
            <Grid item md={4}>
                <SingleComp teamNo={2} state={state} setstate={setstate}/>
                <Events state={state} setstate={setstate} />
            </Grid>
        </Grid>
    )
}

function SingleComp({teamNo,state, setstate}){
    const [goals, setgoals] = useState(0)

    const handleGoalChange = (e)=>{
        setgoals(e.target.value)
        setstate({
            ...state,
            [`team${teamNo}`]:{
                ...state[`team${teamNo}`],
                goals:e.target.value
            }
            
        })
    }

    return (
    
            <TextField  
                label={`Team_${teamNo}_Goals`}
                value={goals}
                onChange={handleGoalChange}  
                />

    )
}


