import React, { useState,useEffect } from 'react'
import {Team1,Team2} from '@customComponent/Team'
import Mtable from '@customComponent/Mtable';
import Versus from '@customComponent/versus';
import {makeStyles} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTournamentResults } from '../../../../Redux/Ducks/ResultsDuck';


const useStyles = makeStyles(theme=>({

  
  }));

export default function Results() {

    const {results,fetching} = useSelector(state=>state.results);
    const {tournamentInfo} = useSelector(state=>state.tournament)
    const dispatch = useDispatch();
console.log({results})

    const [columns, setcolumns] = useState([
        
        {
            field:'team1_details.name',
            render: rowData => (<Team1 name={rowData.team1_details.name} logo={rowData.team1_details.logo} panel='user' />),
        },
        {
            render:rowData => <Versus data={rowData} vdb />
        },
        {
            field:'team2_details.name',
            render: rowData => <Team2 name={rowData.team2_details.name} logo={rowData.team2_details.logo} panel='user' />
        },
        
    ])

    useEffect(()=>{
        if(results.length === 0){
            dispatch(fetchTournamentResults(tournamentInfo.id))    
        }
    },[])


    return (
        <div className='responsiveTable frTable'>
            <Mtable
                frTable={true}
                columns={columns}
                data={results}
                paging={true}
                editable={false}
                loading={fetching}
                header={{display:'none'}}
                
            />
        </div>
    )
}