import React, { useState, useEffect } from 'react'
import MaterialTable,{MTableToolbar,MTableActions} from 'material-table';
import {makeStyles} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const useStyles=makeStyles(theme=>({
    toolbar:{
        padding:'5px 10px',
        display:'flex',
        justifyContent:'space-between'
    }
}))

export default function EventPanel({events,team}) {
    const classes = useStyles();
    const [editMode, setEditMode] = useState(false)

    const [columns,setColumns] = useState([
        {
            title:'Event',
            render: rowData => {
                switch (rowData.event_id) {
                    case 1:
                        return 'Goal'
                        break;
                    case 2:
                        return 'YC'
                        break;
                    case 3:
                        return 'RC'
                        break;
                
                    default:
                        break;
                }
            },
            cellStyle:{
                padding:'5px',
                fontSize:'12px',
                textAlign:'center'
            },
            width:'50px',
        },
        {
            title:'Player',
            field:'player.name',
            cellStyle:{
                padding:'5px',
                fontSize:'12px',
                textAlign:'center'
            }
        },
        {
            title:'Min',
            field:'minute',
            cellStyle:{
                padding:'5px',
                fontSize:'12px',
                textAlign:'center'
            },
            // width:'50px',
        },
        {
            title:'Assisted',
            field:'assist_player.name',
            cellStyle:{
                padding:'5px',
                fontSize:'12px',
                textAlign:'center'
                
            }
        },
    ])

    const [data, setData] = useState()
    useEffect(()=>{
        setData(events)
    },[])
    return (
        <div >
            <MaterialTable
                // title={`${team} Events`} 
                style={{ boxShadow: 'unset',background:'unset' }}
                columns={columns}
                data={data}
               
                options={{
                    search:false,
                    actionsColumnIndex: -1,
                    headerStyle: { 
                        backgroundColor: '#F1CB29', 
                        fontWeight: 'bold',
                        padding:'0 5px',
                        textAlign:'center'
                     },
                    paging:false,
                    sorting:false,
                     
                }}

                actions={ editMode ?
                    [
                        {
                            icon: 'edit',
                            iconProps: { style: { fontSize: "20px",color:'rgba(0, 0, 0, 0.54)' } },
                            tooltip: 'Save User',
                            onClick: (event, rowData) => alert("You saved " + rowData.name),
                           
                        },
                        {
                            icon: 'delete',
                            iconProps: { style: { fontSize: "20px",color:'rgba(0, 0, 0, 0.54)' } },
                            tooltip: 'Delete User',
                            onClick: (event, rowData) => confirm("You want to delete " + rowData.name),
                           
                        }
                  ] : false
                }

                  

                components={{
                    Toolbar: props => (
                        <>
                            <div className={classes.toolbar} style={{fontWeight:700}}>
                                <div>{`${team} Events`}</div>
                                <Tooltip title='Edit'>
                                    <IconButton aria-label="edit" style={{padding:0}} onClick={()=>setEditMode(!editMode)}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            
                            </div>
                        </>
                         
                    ),
                    
                }}
            
            />
            
        </div>
    )
}
