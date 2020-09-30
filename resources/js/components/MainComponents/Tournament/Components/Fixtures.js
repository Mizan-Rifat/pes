import React, { useState, useEffect } from 'react';
import {makeStyles} from '@material-ui/core';
import Mtable from '@customComponent/Mtable';
import clsx from 'clsx';
import {Team1,Team2} from '@customComponent/Team'
import Versus from '@customComponent/Versus'
import { useSelector,useDispatch } from 'react-redux';
import { fixtureTableColumns } from '../../../CData/table';
import { fetchTournamentFixtures } from '../../../Redux/Ducks/FixturesDuck';

const useStyles = makeStyles(theme=>({


  }));

export default function Fixtures() {


    const {fixtures,fetching} = useSelector(state=>state.fixtures)
    const {tournamentInfo} = useSelector(state=>state.tournament)

    const dispatch = useDispatch()

    const columns = fixtureTableColumns;


    useEffect(()=>{
        if(fixtures.length === 0){
            dispatch(fetchTournamentFixtures(tournamentInfo.id))    
        }
    },[])

    return (
        <>

                <div className='responsiveTable frTable'>
                    <Mtable
                        frTable={true} 
                        columns={columns}
                        data={fixtures}
                        editable={false}
                        loading={fetching}
                        paging={true}
                        header={{display:'none'}}
                      
                    />
                </div>
        </>
    )
}

