import React,{useState,useEffect} from 'react';
import MaterialTable from 'material-table';
import {MenuItem,FormControl,TextField,Select, Button,Input, Tooltip,IconButton} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';

import {makeStyles} from '@material-ui/core';
import EventPanel from './EventPanel';
import DetailPanel from './DetailPanel';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllResults } from '@actions/resultActions';
import { removeData } from 'jquery';
import Mtable from '@customComponent/Mtable';
import {Team1,Team2} from '@customComponent/Team'
import { fetchTournamentResults } from '../../../../../Redux/Ducks/ResultsDuck';
import { ListGroupItem1, ListGroupItem2 } from '../../../../../CustomComponent/ListGroupItem';


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
    team2:{
        height:'25px',
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    result:{

        height:'25px',
        display:'flex',
    },
  }));
  

export default function Results({setTitle}) {

    const {results,fetching,loading} = useSelector(state=>state.results);
    const {tournamentInfo} = useSelector(state=>state.tournament)
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(false)
    const [dialogOpen,setDialogOpen] = useState(false)

    const [columns, setcolumns] = useState([
        {
            title:'ID',
            field:'id',
            cellStyle: {
                width: 10,
                maxWidth: 5,
                padding:0
            },
            headerStyle: {
                width:10,
                maxWidth: 5,
                padding:0
            },
            editable: 'never',
            sorting:false
        },
        {
            'title':'Team1',
            field:'team1_details.name',
            render : rowData => <ListGroupItem1 mini image={rowData.team1_details.logo} label={rowData.team1_details.name} />,
            editable: 'never'

        },
        {
            field:'team1_goals',
            cellStyle: {
                width: 10,
                maxWidth: 10,
            },
            headerStyle: {
                width:10,
                maxWidth: 10,
            },
        },
        {
            field:'team2_goals',
            cellStyle: {
                width: 10,
                maxWidth: 10,
                padding:0
            },
            headerStyle: {
                width:10,
                maxWidth: 10,
                padding:0
            },
        },
        {
            'title':'Team2',
            field:'team2_details.name',
            render : rowData => <ListGroupItem1 mini image={rowData.team2_details.logo} label={rowData.team2_details.name} />,
            editable: 'never'
        },
        {
            title:'Approved By',
            render : rowData => 'Mizan Rifat',
            cellStyle: {
                textAlign: 'center',
            }, 
        },
        

    ])

    const handleMultipleEdit = (e,data)=>{
        setDialogOpen(true)
        console.log(data)
    }
   
    const handleEdit = ()=>{
        results.forEach(d => {if(d.tableData)d.tableData.checked = false})
        setEditMode(!editMode)
    }

    const handleAddRow = (newData) => (

        new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);
            
              resolve();
            }, 1000)
          })
    )

    const handleUpdateRow = (newData) => (

        new Promise((resolve,reject)=>{
            
            dispatch(updateFixture(newData))
            .then(response=>{
                toast(response,'success')
                resolve();
            }).catch(error=>{
                Object.entries(error).map(err=>{
                    console.log({err})
                    toast(error[err[0]][0],'error')
                })
                reject();
            })
        })
    )

    const handleDeleteRow = (oldData) => (
        new Promise((resolve, reject) => {
                            
            dispatch(deleteFixture([oldData.id]))
            .then(response=>{
                toast(response,'success')
                resolve()
            }).catch(error=>{
                toast(error,'error')
                resolve()
            })

        })
    )


    useEffect(()=>{
        setTitle('Results')
        if(results.length === 0){
            dispatch(fetchTournamentResults(tournamentInfo.id))    
        }
    },[])

    return (
        
        <Mtable 
            columns={columns}
            data={results}
            loading={loading || fetching}
            handleAddRow={handleAddRow}
            handleUpdateRow={handleUpdateRow}
            handleDeleteRow={handleDeleteRow}
            paging={true}
            selectMode={true}
            actions={[
                {
                tooltip: 'Remove Selected',
                icon: 'delete',
                onClick: (event, data) => console.log(data),
                position:'toolbarOnSelect'
                
                },
                {
                    icon: 'edit',
                    tooltip: 'Edit Selected',
                    onClick: (event, data) => handleMultipleEdit(event,data),
                    position:'toolbarOnSelect'
                    
                },
            ]}

            detailPanel={rowData => <DetailPanel id={rowData.id} team1_id={rowData.team1_id} team2_id={rowData.team2_id}/>}
        />
    )
}


// function Team1({team1_details}){
//     const classes = useStyles();
//     return(
//         <div className={classes.team}>
//             <img src={`http://127.0.0.1:8000/images/logo/${team1_details.logo}`} className={classes.logo}/>
//             <div>{team1_details.name}</div>   
//         </div>
//     )
// }
// function Team2({team2_details}){
//     const classes = useStyles();
//     return(
//         <div className={classes.team2}>
//             <div>{team2_details.name}</div>  
//             <img src={`http://127.0.0.1:8000/images/logo/${team2_details.logo}`} className={classes.logo}/>
             
//         </div>
//     )
// }


function ResultComponent({rowData}){
    const classes = useStyles();
      return(

          <div className={classes.result}>
            <h3>{rowData.team1_goals}</h3>
            <h3>:</h3>
            <h3>{rowData.team2_goals}</h3>

          </div>
         
      )
  
  }