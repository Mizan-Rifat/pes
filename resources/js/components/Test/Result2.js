import React,{useState,useEffect} from 'react';
import MaterialTable from 'material-table';
import {MenuItem,FormControl,TextField,Select, Button,Input, Tooltip,IconButton} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';

import {makeStyles} from '@material-ui/core';
import EventPanel from './EventPanel';
import DetailPanel from './DetailPanel';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllResults } from '../../../../actions/resultActions';
import { removeData } from 'jquery';


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

    const {results,loading} = useSelector(state=>state.results);
    const {id:tournament_id} = useSelector(state=>state.info.tournament)
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(false)
    const [dialogOpen,setDialogOpen] = useState(false)

    const [columns, setcolumns] = useState([
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
            field:'team1_details.name',
            render : rowData => <Team1 team1_details={rowData.team1_details}/>,
            editable: 'never'

        },
        {
            title:'Result',
            field:'result',
            render : rowData => <ResultComponent rowData={rowData}/> 
        },
        {
            field:'team2_details.name',
            render : rowData => <Team2 team2_details={rowData.team2_details}/>,
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
    useEffect(()=>{
        setTitle('Results')
        if(results.length === 0){
            dispatch(fetchAllResults(tournament_id))    
        }
    },[])

    return (
        <>
            <div className='text-right'>
             
                    <Tooltip title='Edit'>
                        <IconButton aria-label="edit" onClick={handleEdit}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
       
            </div>

            <MaterialTable
                style={{ boxShadow: 'unset',background:'unset' }}
                title=''
                columns={columns}
                data={results}
                isLoading={loading}        
                options={{
                    search:true,
                    actionsColumnIndex: -1,
                    headerStyle: { backgroundColor: '#F1CB29', fontWeight: 'bold' },
                    pageSize:10,
                    selection: editMode
                    
                }}
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
                editable={ editMode ? {
                    onRowAdd: newData =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          setData([...data, newData]);
                        
                          resolve();
                        }, 1000)
                      }),
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                          console.log({newData})
                    

                            resolve();

                      }),
                    onRowDelete: oldData =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataDelete = [...data];
                          const index = oldData.tableData.id;
                          dataDelete.splice(index, 1);
                          console.log({dataDelete})
                          setData([...dataDelete]);
            
                          resolve();
                        }, 1000)
                      }),
                  }
                  :
                  false
                
                }
                detailPanel={rowData => <DetailPanel id={rowData.id} team1_id={rowData.team1_id} team2_id={rowData.team2_id}/>}
                
            
            />
            
      </>
    )
}


function Team1({team1_details}){
    const classes = useStyles();
    return(
        <div className={classes.team}>
            <img src={`http://127.0.0.1:8000/images/logo/${team1_details.logo}`} className={classes.logo}/>
            <div>{team1_details.name}</div>   
        </div>
    )
}
function Team2({team2_details}){
    const classes = useStyles();
    return(
        <div className={classes.team2}>
            <div>{team2_details.name}</div>  
            <img src={`http://127.0.0.1:8000/images/logo/${team2_details.logo}`} className={classes.logo}/>
             
        </div>
    )
}


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