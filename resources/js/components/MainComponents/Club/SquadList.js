import React, { useState } from 'react'
import  Mtable  from '@customComponent/Mtable'
import { Team1 } from '@customComponent/Team';
import SearchComp from '@customComponent/SearchComp';
import Notify from '@customComponent/Notify';
import { useSelector,useDispatch } from 'react-redux';
import { addPlayerInClub, removePlayerFromClub, updatePlayersOfSquad } from '../../Redux/actions/clubsAction';
import Title from '../Tournament/Components/Title';



export default function SquadList() {


    const {club,squadLoading:loading} = useSelector(state=>state.clubs)
    const dispatch = useDispatch() 

    const toast = Notify();
console.log({club})
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
            render:rowData => <Team1 logo={rowData.image} name={rowData.name} panel='admin' imageStyle={{height:'40px'}} />,
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


    const handleAddRow = (newData) => (

        new Promise((resolve,reject)=>{
          
            dispatch(addPlayerInClub(newData,club.id))

            .then(response=>{
                toast(response,'success')
                resolve();
            }).catch(error=>{
                Object.keys(error).map(err=>{
                    toast(error[err],'error')
                })
                reject();
            })
        })
    )

    const handleUpdateRow = (newData) => (

        new Promise((resolve,reject)=>{
            
            dispatch(updatePlayersOfSquad(newData,club.id))
            .then(response=>{
                toast(response,'success')
                resolve();
            }).catch(error=>{
               
                Object.keys(error).map(err=>{
                    toast(error[err],'error')
                })
                reject();
            })
        })
    )

    const handleDeleteRow = (oldData) => (
        new Promise((resolve, reject) => {
                            
            dispatch(removePlayerFromClub(club.id,[oldData.id]))
            .then(response=>{
                toast(response,'success')
                resolve()
            }).catch(error=>{
                Object.keys(error).map(err=>{
                    toast(error[err],'error')
                })
                resolve()
            })

        })
    )

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
                handleAddRow={handleAddRow}
                handleUpdateRow={handleUpdateRow}
                handleDeleteRow={handleDeleteRow}
                
            />
        </>
    )
}
