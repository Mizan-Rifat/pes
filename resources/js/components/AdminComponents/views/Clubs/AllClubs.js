import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import {useSelector,useDispatch} from 'react-redux';
import {fetchAllClubs} from '../../../Redux/Ducks/AllClubsDuck';
import Notify from '@customComponent/Notify';
import CompContainer from '@customComponent/CompContainer';
import Mtable from '@customComponent/Mtable';
import ClubListItem from '@customComponent/clubs/ClubListItem';
import TournamentList from '../../../CustomComponent/clubs/TournamentList';
import SelectTournaments from './SelectTournaments';
import { ListGroupItem1, ListGroupItem2 } from '@customComponent/ListGroupItem';
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

    const {allClubs,loading,fetching} = useSelector(state => state.allClubs);
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
            render : rowData => <ListGroupItem1 mini image={rowData.logo} label={rowData.name} />,

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
        if(allClubs.length === 0){
            dispatch(fetchAllClubs());
        }
    },[])

 

    return (
    
        <CompContainer title='Clubs'>
        

            <Mtable 
                columns={columns}
                data={allClubs}
                loading={loading || fetching}
                paging={true}
                selectMode={true}
                editable={true}
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
