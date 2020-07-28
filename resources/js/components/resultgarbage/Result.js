import React, { useState, useReducer,createContext } from 'react'
import {Grid, TextField} from '@material-ui/core';
import Events from './events/Events';
import myReducer from './myReducer';

export const MyContext = createContext();

export default function Result() {

    const initialState= {
        team1:{
            goals:'',
            events:[],
            rating:[]
        },
        team2:{
            goals:'',
            events:[],
            rating:[]
        }
    }

    const [mainState, dispatch] = useReducer(myReducer, initialState);

    return (

        <MyContext.Provider value={{mainState,dispatch}}>
            <Grid container spacing={3}>
                <Grid item md={4}>
                    
                    <SingleComp teamNo={1} />
                    <Events teamNo={1}/>
                </Grid>
                <Grid item md={4}>
                    
                </Grid>
                <Grid item md={4}>
                    <SingleComp teamNo={2} />
                    <Events teamNo={2}/>
                </Grid>
            </Grid>
        </MyContext.Provider>
    )
}

function SingleComp({teamNo}){
    const [goals, setgoals] = useState(0)

    const handleGoalChange = (e)=>{
        setgoals(e.target.value)
        
    }

    return (
    
            <TextField  
                label={`Team_${teamNo}_Goals`}
                value={goals}
                onChange={handleGoalChange}  
                />

    )
}


