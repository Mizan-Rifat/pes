import React, { useState, useEffect } from 'react'
import {makeStyles} from '@material-ui/core';
import DetailTable from './DetailTable';
import { useDispatch } from 'react-redux';
import Notify from '@customComponent/Notify';
import { addRating,deleteRating } from '@actions/resultActions';

const useStyles=makeStyles(theme=>({
    toolbar:{
        padding:'5px 10px',
        display:'flex',
        justifyContent:'space-between'
    }
}))


export default function RatingsPanel({fixture_id,ratings,team,club_id,players}) {
    const classes = useStyles();
    const dispatch =useDispatch();

    const playerLookup = (players) =>{
        const obj = {};
        players.map(player=>{
            obj[player.id] = player.name
        })
        return obj;
    }
    const ratingLookup = () =>{
        const obj = {};
        for (let index = 0; index < 11; index++) {
            obj[index] = index
            
        }
        return obj;
    }


    const [columns,setColumns] = useState([
        {
            title:'Player',
            field:'player_id',
            lookup:playerLookup(players),
            cellStyle:{
                padding:'5px',
                fontSize:'12px',
                // textAlign:'center'
                
            }
        },
        {
            title:'Rating',
            field:'rating',
            lookup:ratingLookup(),
            cellStyle:{
                padding:'5px',
                fontSize:'12px',
                // textAlign:'center'
                
            }
        },
    ])


    const toast = Notify();


    const handleDeleteRow = (oldData) => (
        new Promise((resolve,reject)=>{
            dispatch(deleteRating(oldData.id,`${team.toLowerCase()}_ratings`))
            .then(response=>{
                toast(response,'success')
                resolve()
            })
            .catch(error=>{
                Object.keys(error).map(err=>{
                    toast(error[err],'error')
                })
                reject();
            })
        })
    ) 
    const handleAddRow = (newData) => (

        new Promise((resolve,reject)=>{
            dispatch(addRating({...newData,fixture_id,club_id},`${team.toLowerCase()}_ratings`))
            .then(response=>{
                toast(response,'success')
                resolve()
            })
            .catch(error=>{
                Object.keys(error).map(err=>{
                    toast(error[err],'error')
                })
                reject();
            })
        })

    ) 



    return (
        <div>
            <DetailTable 
                team={team}
                table={'Ratings'}
                columns={columns}
                data={ratings}
                handleDeleteRow={handleDeleteRow}
                handleAddRow={handleAddRow}
            />
        </div>
    )
}
