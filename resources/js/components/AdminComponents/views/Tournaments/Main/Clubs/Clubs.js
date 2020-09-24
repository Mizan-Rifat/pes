import React, { useEffect, useState } from 'react';
import {makeStyles} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllClubsByTournament, addClubInTournament, deleteClubsFromTournament } from '@actions/clubsAction';
import SearchComp from '@customComponent/SearchComp';
import Notify from '@customComponent/Notify';
import Mtable from '@customComponent/Mtable';
import {ListGroupItem1} from '@customComponent/ListGroupItem'

const useStyles = makeStyles(theme=>({

    logo:{
        height:'100%',
        margin:'0 10px'
    },
    team:{
        height:'25px',
        display:'flex',
        alignItems:'center',
    },
  }));
  


export default function Clubs({setTitle}) {

    const {id:tournament_id} = useSelector(state=> state.info.tournament)
    const {clubs,loading} = useSelector(state=> state.clubs)

    const dispatch = useDispatch();

    const toast = Notify();


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
            render : rowData => <ListGroupItem1 image={rowData.logo} label={rowData.name} imageStyle={{height:'25px',marginRight:'5px'}} />,
            editComponent: props => <SearchComp searchurl='/api/search/club' label='clubs' props={props} />

        },
        {
            title:'Owner',
            field:'owner.name',
            editable: 'never'

        }
    ]);

 
    const handleAddRow = (newData) => (

        new Promise((resolve,reject)=>{
            console.log({newData})
            dispatch(addClubInTournament(newData.name,tournament_id))
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
                                    
            dispatch(deleteClubsFromTournament([oldData.id],tournament_id))
            .then(response=>{
                toast(response,'success')
                resolve()
            }).catch(error=>{
                Object.keys(error).map(err=>{
                    toast(error[err],'error')
                })
                reject();
            })

        })
    )
    

    useEffect(()=>{
        setTitle('Clubs')
    },[])

    return (
        <Mtable 

              columns={columns}
              data={clubs}
              handleAddRow={handleAddRow}
              // handleUpdateRow={}
              handleDeleteRow={handleDeleteRow}
              paging={true}
              editable={true}
          
          />


    )
}

