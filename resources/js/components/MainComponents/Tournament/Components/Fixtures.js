import React, { useState, useEffect } from 'react';
import {makeStyles} from '@material-ui/core';
import Mtable from '@customComponent/Mtable';
import clsx from 'clsx';
import {Team1,Team2} from '@customComponent/Team'
import Versus from '@customComponent/Versus'
import { useSelector,useDispatch } from 'react-redux';
import { fetchAllFixtures, deleteFixture, updateFixture, createFixture } from '@actions/fixturesAction';

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

export default function Fixtures() {


    const {fixtures,loading} = useSelector(state=>state.fixtures)
    const {id:tournament_id} = useSelector(state=>state.info.tournament)

    const dispatch = useDispatch()
 

    const [columns, setcolumns] = useState([
        {
            field:'team1_details.name',
            render: rowData => (<Team1 name={rowData.team1_details.name} logo={rowData.team1_details.logo} panel='user' />),
        },
        {
            render:rowData => <Versus panel='vs' data={rowData} adb />
        },
        {
            field:'team2_details.name',
            render: rowData => <Team2 name={rowData.team2_details.name} logo={rowData.team2_details.logo} panel='user' />
        },

    ])


    useEffect(()=>{
        if(fixtures.length === 0){
            dispatch(fetchAllFixtures(tournament_id,false))    
        }
    },[])

    return (
        <>

                <div className='responsiveTable frTable'>
                    <Mtable
                        // headerLess={true} 
                        columns={columns}
                        data={fixtures}
                        editable={false}
                        loading={loading}
                        paging={true}
                    />
                </div>
        </>
    )
}

