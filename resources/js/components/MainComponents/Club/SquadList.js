import React, { useState } from 'react'
import  Mtable  from '@customComponent/Mtable'
import { Team1 } from '@customComponent/Team';
import SearchComp from '@customComponent/SearchComp';
import {ListGroupItem1} from '@customComponent/ListGroupItem';
import Notify from '@customComponent/Notify';
import { useSelector,useDispatch } from 'react-redux';
import { addPlayerInClub, removePlayerFromClub, updatePlayersOfSquad, testAction } from '../../Redux/actions/clubsAction';
import Title from '@customComponent/Title';
import useTableActions from '../../CustomComponent/useTableActions';



export default function SquadList() {

    const {club,loading} = useSelector(state=>state.clubs)

    const tabelActions = {
        add:testAction,
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
            cellStyle:{
                width:'10%'
            },
            editable: 'never',
            sorting:false
        },
        {
            title:'Player',
            field:'name',
            width:'60%',
            render:rowData => <ListGroupItem1 image={rowData.image} label={rowData.name} panel='admin' />,
            // render:rowData => <Team1 logo={rowData.image} name={rowData.name} panel='admin' imageStyle={{height:'50px'}} />,
            editable: 'onAdd',
            editComponent: props => <SearchComp searchurl='/api/players/search' props={props} label='players'/>
        },
        {
            title:'Position',
            field:'position',
            width:'15%',
            editable: 'never'
        },
        {
            title:'Jersey',
            field:'jersey',
            width:'15%',
        }
    ])


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
                    
                columns={columns}
                data={club.players}
                editable={true}
                search={false}
                // sorting={false}
                loading={loading}
                handleAddRow={handleAdd}
                handleUpdateRow={handleUpdate}
                handleDeleteRow={handleDelete}
                
            />
        </>
    )
}
