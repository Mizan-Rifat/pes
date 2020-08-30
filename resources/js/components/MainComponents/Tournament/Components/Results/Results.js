import React, { useState,useEffect } from 'react'
import {Team1,Team2} from '@customComponent/Team'
import Mtable from '@customComponent/Mtable';
import Versus from '@customComponent/versus';
import {makeStyles} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllResults } from '@actions/resultActions';


const useStyles = makeStyles(theme=>({

    logo:{
        height:'100%',
        margin:'0 10px'
    },
    team:{
        height:'50px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        ['@media (max-width:480px)'] : {
            margin:'5px 0'
          }
    },
    team1:{
        ['@media (max-width:480px)'] : {
            justifyContent:'flex-start !important'
          }
    },
    team2:{
        ['@media (max-width:480px)'] : {
            justifyContent:'flex-end !important'
          }

    },
    date:{
        fontSize:'14px',
        ['@media (max-width:480px)'] : {
            fontSize:'12px'
          }
    },
    small:{
        ['@media (max-width:480px)'] : {
            fontSize:'10px'
          }
    },
    name:{
        fontWeight:700
    }
  }));

export default function Results() {

    const {results,loading} = useSelector(state=>state.results);
    const {id:tournament_id} = useSelector(state=>state.info.tournament)
    const dispatch = useDispatch();


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
            dispatch(fetchAllResults(tournament_id))    
        }
    },[])


    return (
        <div className='responsiveTable frTable'>
            <Mtable
                headerLess={true} 
                columns={columns}
                data={results}
                paging={true}
                editable={false}
                loading={loading}
                
            />
        </div>
    )
}