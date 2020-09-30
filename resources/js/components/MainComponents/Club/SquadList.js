import React, { useState } from 'react'
import  Mtable  from '@customComponent/Mtable'
import { Team1 } from '@customComponent/Team';
import SearchComp from '@customComponent/SearchComp';
import {ListGroupItem1} from '@customComponent/ListGroupItem';
import Notify from '@customComponent/Notify';
import { useSelector,useDispatch } from 'react-redux';
import Title from '@customComponent/Title';
import useTableActions from '../../CustomComponent/useTableActions';
import InfoIcon from '@material-ui/icons/Info';
import { addPlayerInSquad, removePlayerFromSquad, updatePlayerInSquad } from '../../Redux/Ducks/ClubSquadDuck';


export default function SquadList({club}) {

    const {user} = useSelector(state=>state.sessionUser)
    const {ginfo} = useSelector(state=>state.gInfo)
    const {squad,fetching,loading} = useSelector(state=>state.clubSquad)

    const tabelActions = {
        add:addPlayerInSquad,
        update:updatePlayerInSquad,
        delete:removePlayerFromSquad,
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
            editComponent: props => <SearchComp searchurl='/api/player/search' props={props} label='players'/>
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

    const handleAdd = (newData) => handleAddRow({
        playermodel_id:newData.name,
        jersey:newData.jersey,
        club_id:club.id
    })
    const handleUpdate = (newData) => handleUpdateRow({
        id:newData.id,
        jersey:newData.jersey,
    })
   
 

    return (
        <>
            <Title title='Squad' titleStyle={{width:'150px',padding:'10px'}} />
            <Mtable
                title={`${squad.length}/25`}
                columns={columns}
                data={squad}
                // editable={Object.keys(user).length > 0 && user.id == club.owner.id && ginfo.pre_season == true}
                search={false}
                editable={true}
                loading={loading || fetching}
                handleAddRow={handleAdd}
                handleUpdateRow={handleUpdate}
                handleDeleteRow={(oldData)=>handleDeleteRow(oldData.id)}
                paging={squad.length < 5 ? true : false }
                
            />
            <div style={{padding:'15px'}}>
                <InfoIcon />
                Squad must have at least 18 players but not more than 25 players.
                
            </div>
        </>
    )
}
