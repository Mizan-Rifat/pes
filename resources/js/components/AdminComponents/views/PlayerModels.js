import React, { useState, useEffect, useRef } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import {useSelector,useDispatch} from 'react-redux';
import Notify from '@customComponent/Notify';
import CompContainer from '@customComponent/CompContainer';
import {ListGroupItem1} from '@customComponent/ListGroupItem';
import Mtable from '@customComponent/Mtable';
import {fetchPlayer_model} from '@ducks/PlayerModelsDuck'
import useTableActions from '@customComponent/useTableActions';
import { addPlayer_model, deletePlayer_model, updatePlayer_model } from '../../Redux/Ducks/PlayerModelsDuck';
import { MTableEditRow } from 'material-table';

const useStyles =makeStyles(theme=>({
    container:{
        padding:'10px'
    }
}));

export default function PlayerModels() {
    const classes = useStyles();

    const toast = Notify();

    const [pic, setPic] = useState();


    const {players,loading,fetching} = useSelector(state => state.playerModels);
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
            field: 'image',
            render:rowData => <img src={`${rowData.image}`} style={{height:'50px'}} />,
            editComponent:rowData=><input
                                        accept="image/*"
                                        onChange={(e)=>setPic(e.target.files[0])}
                                        type="file"
                                    />
        },
        {
            title:'Player',
            field: 'name',
            // render:rowData => <ListGroupItem1 image={rowData.image} label={rowData.name} />,
        },
        {
            title:'Model Id',
            field:'model_id',

        },
        {
            title:'Position',
            field:'position',

        },
        {
            title:'Type',
            field:'type',
            lookup:{
                1:<img src={`/images/logo/ball1.png`} style={{height:'25px'}} />,
                2:<img src={`/images/logo/ball2.png`} style={{height:'25px'}} />
            }
        }
    ]);

    const tabelActions = {
        add:addPlayer_model,
        update:updatePlayer_model,
        delete:deletePlayer_model,
    }

    const {handleAddRow,handleUpdateRow,handleDeleteRow} = useTableActions(tabelActions)

   

    const handleAdd = (newData)=>{
        console.log({newData})

        const formData = new FormData();

        const data = {
                name:newData.name,
                model_id:newData.model_id,
                position:newData.position,
                type:newData.type
            };

        formData.append('image',pic);
        formData.append('data',JSON.stringify(data));
        return handleAddRow(formData)
    }
    const handleUpdate = (newData)=>{
        console.log({newData})
        const data = {
                id:newData.id,
                model_id: newData.model_id,
                name: newData.name,
                position: newData.position,
                type: newData.type
            };
        return handleUpdateRow(data)
    }


    useEffect(()=>{
        dispatch(fetchPlayer_model())
    },[])



    return (
    
        <CompContainer title='Player Models'>
          

            <Mtable
                columns={columns}
                data={players}
                loading={loading || fetching}
                paging={true}
                handleAddRow={handleAdd}
                handleUpdateRow={handleUpdate}
                handleDeleteRow={(oldData)=>handleDeleteRow(oldData.id)}
                editable={true}
               
                
            />
          
        
        </CompContainer>
    )
}