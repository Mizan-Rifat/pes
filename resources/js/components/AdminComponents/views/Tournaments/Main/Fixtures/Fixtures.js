import React,{useState,useEffect} from 'react';
import MaterialTable from 'material-table';
import {MenuItem,FormControl,TextField,Select,makeStyles, Button,Input, Tooltip,IconButton} from '@material-ui/core';
import SelectComp from '@customComponent/SelectComp';
import EditIcon from '@material-ui/icons/Edit';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import FixtureDialog from './FixtureDialog';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllFixtures, deleteFixture, updateFixture, createFixture } from '@actions/fixturesAction';
import dateFormat from "dateformat";
import Notify from '@customComponent/Notify';
import Mtable from '@customComponent/Mtable';
import { MTableToolbar } from 'material-table';
import { createTournamentFixtures } from '../../../../../Redux/actions/fixturesAction';


const useStyles = makeStyles(theme=>({
    
    toolbar:{
        padding:'0 !important',
        
    },
    createbtn:{
        background:theme.palette.primary.dark,
        borderRadius:0
    }
}))


export default function Fixtures(props) {
    const classes  = useStyles();
    const {setTitle} = props

    const toast = Notify();

    const {fixtures,fetching,loading} = useSelector(state=>state.fixtures)
    const {id:tournament_id} = useSelector(state=>state.info.tournament)
    const {clubs} = useSelector(state=>state.clubs)

    const dispatch = useDispatch();

    const [dialogOpen,setDialogOpen] = useState(false)

    const clubsLookup = (clubs) =>{
        
        const obj = {};
        obj[0] = 'TBD';
        clubs.map(club=>{
            obj[club.id] = club.name
        })

        return obj;
    }

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
            title:'Team1',
            field:'team1_id',
            headerStyle: {
                padding:'16px 0px',
                textAlign:'center'
            },
            lookup:clubsLookup(clubs)
        },
        {
            title:'Team2',
            field:'team2_id',
            headerStyle: {
                padding:'16px 0px',
                textAlign:'center'
            },
            lookup:clubsLookup(clubs)
        },
        {
            title:'Date',
            field:'date',
            headerStyle: {
                padding:'16px 0px',
                textAlign:'center'
            },
            render:rowData => rowData.date != 'N/A' ? dateFormat(rowData.date,'dd mmm yy,h:MM TT') : rowData.date,
            editComponent: props => <SelectComp 
                                        type={'date'}
                                        rowData={props.rowData}
                                        field={'date'} 
                                        props={props}
                                        options={[]}
                                    />
        },
        {
            title:'Group',
            width:'50px',
            field:'group',
            cellStyle:{
                // textAlign:'center'
                paddingLeft:'20px'
            },
            headerStyle: {
                padding:'16px 0px',
                // textAlign:'center'
            },
            lookup:{
                0:'N/A',
                1:'A',  
                2:'B',  
                3:'C',  
                4:'D',  
            },
        },
        {
            title:'Round',
            field:'round',
            width:'50px',
            cellStyle:{
                // textAlign:'center'
                paddingLeft:'20px'
            },
            headerStyle: {
                padding:'16px 0px',
                // textAlign:'center'
            },
            validate: rowData => rowData.round !== '',
            

        },
        {
            title:'Leg',
            field:'leg',
            width:'50px',
            headerStyle: {
                padding:'16px 0px',
                textAlign:'center'
            },
            lookup:{
                1:1,
                2:2
            }
        },

    ])


    const handleMultipleEdit = (e,data)=>{
        setDialogOpen(true)
        console.log(data)
    }

    const handleCreateTournamentFixtures = () => {
        dispatch(createTournamentFixtures(tournament_id))
        .then(response=>{
            toast(response,'success')
        })
        .catch(error=>{
            toast(error.message,'error')
        })
    }
    
  

    const handleAddRow = (newData) => (

        new Promise((resolve,reject)=>{
            console.log({newData})
            dispatch(createFixture(newData,tournament_id))
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
            
            dispatch(updateFixture(newData))
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
                            
            dispatch(deleteFixture([oldData.id]))
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



    useEffect(()=>{
        setTitle('Fixtures')
        if(fixtures.length === 0){
            dispatch(fetchAllFixtures(tournament_id,true))    
        }
        
    },[])

    return (
        <>
            <Mtable 
                title={fixtures.length == 0 ?  <CreateFixturesBtn handleCreateTournamentFixtures={handleCreateTournamentFixtures} />: ''}
                columns={columns}
                data={fixtures}
                loading={loading || fetching}
                handleAddRow={handleAddRow}
                handleUpdateRow={handleUpdateRow}
                handleDeleteRow={handleDeleteRow}
                paging={true}
                selectMode={true}
                editable={true}
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
                components={{
                    Toolbar: props => (
                            <MTableToolbar {...props} classes={{root:classes.toolbar}} />
                        
                    ),
                }}
            />


            <FixtureDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
            />
      </>
    )
}

function CreateFixturesBtn({handleCreateTournamentFixtures}){
    const classes  = useStyles();

    return(
        <Button color='primary' variant='contained' className={classes.createbtn} onClick={handleCreateTournamentFixtures}>Create Fixtures</Button>
    )
}