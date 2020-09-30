import React, { useEffect } from 'react'
import DoubleSidebarLayout from './DoubleSidebarLayout'
import TournamentSidebar from './TournamentSidebar'
import Main from './Main/Main'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {setTournament } from '../../../Redux/Ducks/TournamentDuck'

export default function Tournament(props) {
    const history = useHistory();

    const {tournaments} = useSelector(state=> state.tournaments)
    const {fetching} = useSelector(state=> state.tournament)

    const dispatch = useDispatch();
    const slug = props.match.params.title;


    useEffect(()=>{
        const tournament = tournaments.find(item=>item.slug == slug)

        if(tournament == undefined){
            history.push('/error');
            return;
        }

        dispatch(setTournament(tournament))

    },[slug])


    return (
        <>

            {
                !fetching &&
                
                <DoubleSidebarLayout
                    sidebar={<TournamentSidebar />}
                    main={<Main />}
                    
                />
            }        
            
        </>
    )
}
