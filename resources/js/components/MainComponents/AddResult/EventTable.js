import React,{useState} from 'react';
import Mtable from '@customComponent/Mtable';
import {makeStyles, TextField} from '@material-ui/core';
import { MTableToolbar } from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { addEventToState, removeEventFromState } from '../../Redux/actions/resultAddAction';
import Notify from '@customComponent/Notify';

const useStyles = makeStyles(theme=>({
    container:{
        // boxShadow:'0 6px 12px rgba(0,0,0,.1)',
        marginTop:'30px',
    },
    listItemContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    toolbar:{
        padding:'0 !important',
        minHeight:'unset'
        
    },
}))

export default function EventTable({players,club_id,events,loading}) {

    const classes  = useStyles();

    const dispatch = useDispatch();

    const toast = Notify();
  

    const playerLookup = (players) =>{
        const obj = {};
        players.map(player=>{
            obj[player.id] = player.name
        })
        return obj;
    }


    const [columns,setColumns] = useState([
        {
            title:'Event',
            field:'event_id',
            lookup:{
                1:'Goal',
                2:'YC',
                3:'RC',
                4:'OG' 
            },
            

            cellStyle:{
                padding:'5px',
                fontSize:'12px',
                // textAlign:'center'
            },
            width:'50px',
        },
        {
            title:'Player',
            field:'player_id',
            // field:'player.name',
            lookup:playerLookup(players),
            cellStyle:{
                padding:'5px',
                fontSize:'12px',
                // textAlign:'center'
            }
        },
        {
            title:'Min',
            field:'minute',
            cellStyle:{
                padding:'5px',
                fontSize:'12px',
                // textAlign:'center'
            },
            
        },
        {
            title:'Assisted',
            field:'assist_player_id',
            lookup:{
                0:'None',
                ...playerLookup(players)
            },
            cellStyle:{
                padding:'5px',
                fontSize:'12px',
                // textAlign:'center'
                
            }
        },
    ])


    const handleAddRow = (newData) => (

        new Promise((resolve,reject)=>{

            console.log({newData})

            if( !newData.hasOwnProperty('event_id')){
                toast('Event field is required.','error')
             
                return reject();
            }
            
            if( !newData.hasOwnProperty('player_id')){
                toast('player field is required.','error')
              
                return reject()
            }
            
            if( !newData.hasOwnProperty('minute')){
                toast('Minute field is required.','error')
             
                return reject()
            }
            if( !Number.isInteger(parseInt(newData.minute))){
                toast('Invalid Minute','error')
             
                return reject()
            }

            const data = {
                ...newData,
                club_id,
                assist_player_id:newData.hasOwnProperty('assist_player_id') ? newData.assist_player_id : null 
            }

            dispatch(addEventToState(data))
            resolve()
         
        })

    ) 
    const handleDeleteRow = (oldData) => (

        new Promise((resolve,reject)=>{
            
            dispatch(removeEventFromState(oldData.eventKey))
            resolve()
        })

    ) 

    return (
        <Mtable 
                columns={columns}
                data={events}
                handleAddRow={handleAddRow}
                handleDeleteRow={handleDeleteRow}
                edit={!loading}
                addLast={true}
                title='Events'
                header={{padding:'8px'}}
                search={false}
                components={{
                    Toolbar: props => (
    
                      <div className='detailTable'>
                          <MTableToolbar {...props} classes={{root:classes.toolbar}} />
                      </div>
                      
                    ),
                  }}
            />
    )
}
