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
import { fetchTournamentFixtures } from '../../../../../Redux/Ducks/FixturesDuck';
import { ListGroupItem1, ListGroupItem2 } from '../../../../../CustomComponent/ListGroupItem';
import useTableActions from '@customComponent/useTableActions';
import SearchComp from '@customComponent/SearchComp';
import { fetchTournamentClubs } from '../../../../../Redux/Ducks/TournamentClubsDuck';

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
    const {tournamentInfo} = useSelector(state=>state.tournament)
    

    const dispatch = useDispatch();

    console.log({fixtures})

    const [dialogOpen,setDialogOpen] = useState(false)

    // const tabelActions = {
    //     add:createNewTournament,
    //     update:updateTournament,
    //     delete:deleteTournament,
    // }

    // const {handleAddRow,handleUpdateRow,handleDeleteRow} = useTableActions(tabelActions)




    const [columns, setcolumns] = useState([
        {
            title:'ID',
            field:'id',
            editable: 'never',
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
            title:'Team1',
            field:'team1_details.name',
            render:(rowData)=><ListGroupItem1 mini image={rowData.team1_details.logo} label={rowData.team1_details.name} />,
            editComponent:props=><SearchComp searchurl='/api/search/club' label='clubs' props={props} />
            
        },
  
        {
            title:'Team2',
            field:'team2_details.name',
         
            render:(rowData)=><ListGroupItem1 mini image={rowData.team2_details.logo} label={rowData.team2_details.name} />,
            editComponent:props=><SearchComp searchurl='/api/search/club' label='clubs' props={props} />
        },
        {
            title:'Date',
            field:'date',
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
            lookup:{
                null:'N/A',
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
    
  

    const handleAddRow = (newData) => {
        const data = {
            team1_id:newData.team1_details.name,
            team2_id:newData.team2_details.name,
            date:newData.date,
            group_: newData.group,
            leg: newData.leg,
            round: newData.round,
        }
    }

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
            dispatch(fetchTournamentFixtures(tournamentInfo.id))    
        }

        
    },[])

    return (
        <>
            <Mtable 
                title={fixtures.length == 0 ?  <CreateFixturesBtn handleCreateTournamentFixtures={handleCreateTournamentFixtures} />: ''}
                columns={columns}
                data={fixtures}
                loading={loading || fetching }
                handleAddRow={handleAddRow}
                handleUpdateRow={handleUpdateRow}
                handleDeleteRow={handleDeleteRow}
                paging={true}
                // selectMode={true}
                // editable={true}
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