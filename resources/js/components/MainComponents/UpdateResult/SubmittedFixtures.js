import React, { useState, useEffect } from 'react';
import {makeStyles, Container} from '@material-ui/core';
import Mtable from '@customComponent/Mtable';
import clsx from 'clsx';
import {Team1,Team2} from '@customComponent/Team'
import Versus from '@customComponent/Versus'
import { useSelector,useDispatch } from 'react-redux';
import { fetchAllFixtures, deleteFixture, updateFixture, createFixture } from '@actions/fixturesAction';
import { fixtureTableColumns } from '../../CData/table';
import { fetchSubmittedFixtures } from '@actions/fixturesAction';

const useStyles = makeStyles(theme=>({

  }));

export default function SubmittedFixtures(props) {


    const {fixtures,fetching} = useSelector(state=>state.fixtures)

    const dispatch = useDispatch()
    const tournament_id = props.match.params.tournament_id;
    const {user} = useSelector(state => state.session)
    const {tournaments} = useSelector(state=>state.tournaments)

    const [restricted,setRestricted] = useState({
        state:false,
        msg:''
    })

    useEffect(() => {
        const tournament = tournaments.find(item=>item.id == tournament_id)
        const is_official = tournament.officials.some(item=>item.user_id == user.id)
       



    }, [])

   

    

    

    const [columns, setcolumns] = useState([
        {
            field:'team1_details.name',
            render: rowData => (<Team1 name={rowData.team1_details.name} logo={rowData.team1_details.logo} panel='user' />),
        },
        {
            render:rowData => <Versus panel='vs' data={rowData} approve />
        },
        {
            field:'team2_details.name',
            render: rowData => <Team2 name={rowData.team2_details.name} logo={rowData.team2_details.logo} panel='user' />
        },
    ])

    useEffect(()=>{
        dispatch(fetchSubmittedFixtures(tournament_id)) 
    },[])

    return (
        <Container>

                <div className='responsiveTable frTable'>
                    <Mtable
                        columns={columns}
                        data={fixtures}
                        editable={false}
                        loading={fetching}
                        paging={true}
                    />
                </div>
        </Container>
    )
}

