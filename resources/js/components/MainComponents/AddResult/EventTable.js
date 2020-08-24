import React,{useState} from 'react';
import Mtable from '@customComponent/Mtable';
import {makeStyles} from '@material-ui/core';
import { MTableToolbar } from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { addEventToState, removeEventFromState } from '../../Redux/actions/resultAddAction';

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

export default function EventTable({players,id,setId,club_id}) {

    const classes  = useStyles();
    // const {} = useSelector(state => state.addResult)
    const dispatch = useDispatch();

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
                3:'RC'
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
            // width:'50px',
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

    const [data, setdata] = useState([])
    


    const handleAddRow = (newData) => (

        new Promise((resolve,reject)=>{
            console.log({newData})
            const abc = {...newData,id,club_id}
            dispatch(addEventToState(abc))
            setId(id+1)
            setdata([...data,abc])

            resolve()
         
        })

    ) 
    const handleDeleteRow = (oldData) => (

        new Promise((resolve,reject)=>{
            console.log({oldData})
            dispatch(removeEventFromState(oldData.id))
            setdata(data.filter(event=> event.id != oldData.id))
            resolve()
        })

    ) 

    return (
        <Mtable 
                columns={columns}
                data={data}
                handleAddRow={handleAddRow}
                handleDeleteRow={handleDeleteRow}
                edit={true}
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
