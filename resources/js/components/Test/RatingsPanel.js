import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
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


export default function RatingsPanel({ratings,team}) {
    const classes = useStyles();
    const [editMode, setEditMode] = useState(false)
    const [columns,setColumns] = useState([
        {
            title:'Player',
            field:'player.name',
            cellStyle:{
                padding:'5px',
                fontSize:'12px',
                // textAlign:'center'
                paddingLeft:'45px'
                
            }
        },
        {
            title:'Rating',
            field:'rating',
            cellStyle:{
                padding:'5px',
                fontSize:'12px',
                textAlign:'center'
                
            }
        },
    ])

    const [data, setData] = useState([])


    useEffect(()=>{
        setData(ratings)
    },[])


    return (
        <div>
            <MaterialTable
                // title={`${team} Ratings`} 
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
                    actionsCellStyle:{fontSize: "20px",color:'rgba(0, 0, 0, 0.54)'},
                     
                }}
        
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
                    
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            console.log({dataUpdate})
                            setData([...dataUpdate]);

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
       
                components={{
                    Toolbar: props => (
                
                            <div className={classes.toolbar} style={{fontWeight:700}} {...props}>
                                <div>{`${team} Ratings`}</div>
                                <Tooltip title='Edit'>
                                    <IconButton aria-label="edit" style={{padding:0}} onClick={()=>setEditMode(!editMode)}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            
                            </div>
                         
                    )
                }}
            
            />
        </div>
    )
}
