import React, { useState, useEffect, useRef } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import {useSelector,useDispatch} from 'react-redux';
import Notify from '@customComponent/Notify';
import CompContainer from '@customComponent/CompContainer';
import {ListGroupItem1} from '@customComponent/ListGroupItem';
import Mtable from '@customComponent/Mtable';
import useTableActions from '@customComponent/useTableActions';
import { addClub_models, deleteClub_models, fetchClub_models, updateClub_models } from '../../Redux/Ducks/ClubModelsDuck';


const useStyles = makeStyles(theme=>({

}))

export default function ClubModels() {

    const classes = useStyles();


    const [pic, setPic] = useState();


    const {clubs,loading,fetching} = useSelector(state => state.clubModels);
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
            field: 'logo',
            render:rowData => <img src={`${rowData.logo}`} style={{height:'50px'}} />,
            editable:'onAdd',
            editComponent:rowData=><input
                                        accept="image/*"
                                        onChange={(e)=>setPic(e.target.files[0])}
                                        type="file"
                                    />
        },
        {
            title:'Club',
            field: 'name',
            // render:rowData => <ListGroupItem1 image={rowData.image} label={rowData.name} />,
        },
        {
            title:'Model Id',
            field:'model_id',

        },
    ]);

    const tabelActions = {
        add:addClub_models,
        update:updateClub_models,
        delete:deleteClub_models,
    }

    const {handleAddRow,handleUpdateRow,handleDeleteRow} = useTableActions(tabelActions)

   

    const handleAdd = (newData)=>{

        const formData = new FormData();

        const data = {

                name:newData.name,
                model_id:newData.model_id,
            };

        formData.append('logo',pic);
        formData.append('data',JSON.stringify(data));
        return handleAddRow(formData)
    }

    const handleUpdate = (newData)=>{
    
        const data = {
            id:newData.id,    
            name:newData.name,
            model_id:newData.model_id,
        };  

        return handleUpdateRow(data)
       
    }

    useEffect(()=>{
        dispatch(fetchClub_models())
    },[])



    return (
    
        <CompContainer title='Player Models'>
          

            <Mtable
                columns={columns}
                data={clubs}
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
