import React, { useEffect } from 'react'
import DoubleSidebarLayout from './DoubleSidebarLayout'
import TournamentSidebar from './TournamentSidebar'
import Main from './Main/Main'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchInfo, reset } from '@actions/infoAction'
import { fetchAllClubsByTournament } from '@actions/clubsAction'





export default function Tournament(props) {
    const history = useHistory();

    const {fetchLoading} = useSelector(state=> state.info)
    const dispatch = useDispatch();
    const slug = props.match.params.title;


    useEffect(()=>{

        dispatch(reset())

        dispatch(fetchInfo(slug))
        
    },[slug])


    return (
        <>

            {
                fetchLoading ? '' :
                
                <DoubleSidebarLayout
                    sidebar={<TournamentSidebar />}
                    main={<Main />}
                    
                />
            }        
            
        </>
    )
}
