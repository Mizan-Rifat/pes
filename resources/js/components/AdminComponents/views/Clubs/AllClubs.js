import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import {useSelector,useDispatch} from 'react-redux';
import {fetchAllClubs} from '@actions/clubsAction';
import Notify from '@customComponent/Notify';
import CompContainer from '@customComponent/CompContainer';
import Mtable from '@customComponent/Mtable';
import ClubListItem from '@customComponent/clubs/ClubListItem';
import TournamentList from '../../../CustomComponent/clubs/TournamentList';
import SelectTournaments from './SelectTournaments';

const useStyles =makeStyles(theme=>({
    container:{
        padding:'10px'
    }
}));

export default function AllClubs() {
    const classes = useStyles();

    const toast = Notify();

    const [open, setOpen] = useState(false)
    const [selectedClubIds, setSelectedClubIds] = useState([])

    const {allClubs:clubs,loading,error,success} = useSelector(state => state.clubs);
    const dispatch = useDispatch()

    const [columns, setColumns] = useState([
        {
            title:'ID',
            field:'id',
            width:'50px',
            headerStyle: {
                padding:'16px 10px',
                textAlign:'center'
            },
            editable: 'never'
        },
        {
            title:'Club',
            field:'name',
            render : rowData => <ClubListItem logo={rowData.logo} name={rowData.name} />,
            editComponent: props => <SearchComp searchurl='/api/clubs/search' props={props} />

        },
        {
            title:'Tournaments',
            field:'tournaments',
            render : rowData => <TournamentList tournaments={rowData.tournaments} />,
            sorting:false

        },
        {
            title:'Owner',
            field:'owner.name',
            editable: 'never'

        }
    ]);

    const handleSendInvitation = (club_ids) => {
        setSelectedClubIds(club_ids)
        setOpen(true)
    }
    


    useEffect(()=>{
        if(clubs.length === 0){
            dispatch(fetchAllClubs());
        }
    },[])

 

    return (
    
        <CompContainer title='Clubs'>
        

            <Mtable 
                columns={columns}
                data={clubs}
                loading={loading}
                paging={true}
                selectMode={true}
                actions={[
                    {
                      tooltip: 'Send Invitation',
                      icon: 'send',
                      onClick: (event, data) => handleSendInvitation(data.map(item=>item.id)),
                      position:'toolbarOnSelect'
                      
                    },
                  ]}
            
            />
            <SelectTournaments 
                open={open}
                setOpen={setOpen}
                club_ids={selectedClubIds}
            />
        
        </CompContainer>
    )
}
