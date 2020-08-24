import React,{useState,useEffect} from 'react';
import MaterialTable from 'material-table';
import {MenuItem,FormControl,TextField,Select,makeStyles, Button,Input, Tooltip,IconButton} from '@material-ui/core';
import SelectComp from '@customComponent/SelectComp';
import EditIcon from '@material-ui/icons/Edit';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import FixtureDialog from './FixtureDialog';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllFixtures, deleteFixture, updateFixture, createFixture } from '../../../../actions/fixturesAction';
import dateFormat from "dateformat";
import Notify from '@customComponent/Notify';

export default function Fixtures(props) {

    const {setTitle} = props

    const slug = props.match.params.title;

    const toast = Notify();

    const {fixtures,loading} = useSelector(state=>state.fixtures)
    const {id:tournament_id} = useSelector(state=>state.info.tournament)
    const {clubs} = useSelector(state=>state.clubs)

    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(false)
    const [dialogOpen,setDialogOpen] = useState(false)

    const [teamOptions, setTeamOptions] = useState(clubs.map(club=>(
        {
            label:club.name,
            value:club.id
        }
    )))
    const [groupOptions, setGroupOptions] = useState([
        {
            label:'None',
            value:0
        },
        {
            label:'A',
            value:1
        },
        {
            label:'B',
            value:2
        },
        {
            label:'C',
            value:3
        },
        {
            label:'D',
            value:4
        },
    ])
    const [legOptions, setLegOptions] = useState([
        {
            label:1,
            value:1
        },
        {
            label:2,
            value:2
        },
    ])

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
            field:'team1_details.name',
            headerStyle: {
                padding:'16px 0px',
                textAlign:'center'
            },
            editComponent: props => <SelectComp 
                                        type={'select'}
                                        rowData={props.rowData}
                                        field={'team1_details.id'}
                                        props={props}
                                        options={teamOptions}
                                    /> 
        },
        {
            title:'Team2',
            field:'team2_details.name',
            headerStyle: {
                padding:'16px 0px',
                textAlign:'center'
            },
            editComponent: props => <SelectComp 
                                        type={'select'}
                                        rowData={props.rowData}
                                        field={'team2_details.id'} 
                                        props={props}
                                        options={teamOptions}
                                    />
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
            render:rowData => rowData.group > 0 ? String.fromCharCode(64 + rowData.group) : 'N/A',
            editComponent: props => <SelectComp 
                                        type={'select'}
                                        rowData={props.rowData} 
                                        field={'group'}
                                        props={props}
                                        options={groupOptions}
                                    />
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
            editComponent: props => <SelectComp 
                                        type={'input'}
                                        rowData={props.rowData} 
                                        field={'round'}
                                        props={props}
                                        options={[]}
                                    />
            

        },
        {
            title:'Leg',
            field:'leg',
            width:'50px',
            headerStyle: {
                padding:'16px 0px',
                textAlign:'center'
            },
            editComponent: props => <SelectComp 
                                        type={'select'}
                                        rowData={props.rowData} 
                                        field={'leg'}
                                        props={props}
                                        options={legOptions}
                                    />
        },

    ])


    const handleMultipleEdit = (e,data)=>{
        setDialogOpen(true)
        console.log(data)
    }
    
    const handleEdit = ()=>{
        fixtures.forEach(d => {if(d.tableData)d.tableData.checked = false})
        setEditMode(!editMode)
    }
    useEffect(()=>{
        setTitle('Fixtures')
        if(fixtures.length === 0){
            dispatch(fetchAllFixtures(slug))    
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
                data={fixtures}
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

                        new Promise((resolve,reject)=>{
                            dispatch(createFixture(newData,tournament_id))
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
                        }),
                    onRowUpdate: (newData, oldData) => {

                        return new Promise((resolve,reject)=>{
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
                        
                    },
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            
                            dispatch(deleteFixture([oldData.id]))
                            .then(response=>{
                                toast(response,'success')
                                resolve()
                            }).catch(error=>{
                                toast(error,'error')
                                resolve()
                            })

                        }),
                  }
                  :
                  false
                
                }
                
            
            />
            <FixtureDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
            />
      </>
    )
}

