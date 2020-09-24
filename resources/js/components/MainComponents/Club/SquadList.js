import React, { useState } from 'react'
import  Mtable  from '@customComponent/Mtable'
import { Team1 } from '@customComponent/Team';
import SearchComp from '@customComponent/SearchComp';
import {ListGroupItem1} from '@customComponent/ListGroupItem';
import Notify from '@customComponent/Notify';
import { useSelector,useDispatch } from 'react-redux';
import { addPlayerInClub, removePlayerFromClub, updatePlayersOfSquad } from '../../Redux/actions/clubsAction';
import Title from '@customComponent/Title';
import useTableActions from '../../CustomComponent/useTableActions';
import InfoIcon from '@material-ui/icons/Info';


export default function SquadList() {

    const {club,loading} = useSelector(state=>state.clubs)
    const {user} = useSelector(state=>state.session)
    const {gInfo} = useSelector(state=>state.gInfo)



    const tabelActions = {
        add:addPlayerInClub,
        update:updatePlayersOfSquad,
        delete:removePlayerFromClub,
    }


    const {handleAddRow,handleUpdateRow,handleDeleteRow} = useTableActions(tabelActions)

    const [columns, setcolmuns] = useState([
        {
            title:'#',
            field: 'tableData.id',
            render:rowData=> rowData.tableData.id + 1,
            width:'5%',
            // cellStyle:{
            //     width:'10%'
            // },
            cellStyle: {
                width: 10,
                maxWidth: 10,
                padding:'6px 10px'
              },
            headerStyle: {
                width:10,
                maxWidth: 10,
                padding:'6px 10px'
              },
            editable: 'never',
            sorting:false
        },
        {
            title:'Player',
            field:'name',
            width:'75%',
            render:rowData => <ListGroupItem1 image={rowData.image} label={rowData.name} panel='admin' />,
            // render:rowData => <Team1 logo={rowData.image} name={rowData.name} panel='admin' imageStyle={{height:'50px'}} />,
            editable: 'onAdd',
            editComponent: props => <SearchComp searchurl='/api/players/search' props={props} label='players'/>
        },
        {
            title:'Position',
            field:'position',
            // width:'10%',
            editable: 'never',
            // cellStyle: {
            //     width: 10,
            //     maxWidth: 10,
            //     padding:'6px 0px'
            //   },
            headerStyle: {
                width:10,
                maxWidth: 65,
                padding:'6px 0'
              },
        },
        {
            title:'Jersey',
            field:'jersey',
            // width:'10%',
            cellStyle: {
                padding:'6px 0px',
                textAlign:'center'
            },
            headerStyle: {
                width:10,
                maxWidth: 50,
                padding:'6px 0px'
              },
        }
    ])

    // const handleAdd = (newData) => {
    //     console.log({newData})
    // }
    const handleAdd = (newData) => handleAddRow({
        playermodel_id:newData.name,
        jersey:newData.jersey,
        club_id:club.id
    })
    const handleUpdate = (newData) => handleUpdateRow({
        id:newData.id,
        jersey:newData.jersey,
        club_id:club.id
    })
   
    const handleDelete = (oldData) => handleDeleteRow({
            club_id:club.id,
            player_ids:[oldData.id]
        })
 

    return (
        <>
            <Title title='Squad' titleStyle={{width:'150px',padding:'10px'}} />
            <Mtable
                title={`${club.players.length}/25`}
                columns={columns}
                data={club.players}
                editable={Object.keys(user).length > 0 && user.club.id == club.id && gInfo.pre_season == true || club.tournaments.length == 0}
                search={false}
                // sorting={false}
                loading={loading}
                handleAddRow={handleAdd}
                handleUpdateRow={handleUpdate}
                handleDeleteRow={handleDelete}
                paging={club.players.length < 5 ? true : false }
                
            />
            <div style={{padding:'15px'}}>
                <InfoIcon />
                Squad have at least 18 players but not more than 25 players.
                .
            </div>
        </>
    )
}
