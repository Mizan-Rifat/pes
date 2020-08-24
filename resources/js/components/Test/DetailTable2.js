import React,{useState} from 'react';
import MaterialTable,{MTableToolbar,MTableEditRow} from 'material-table';
import {makeStyles, colors} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const useStyles=makeStyles(theme=>({
    toolbar:{
        padding:'0 !important',
        minHeight:'unset'
        
    },
    actions:{
        fontSize: "12px",
        color:'rgba(0, 0, 0, 0.54)',
        padding:'5px',
        '&.MuiIconButton-root':{
            padding:0
        }
    }
}))

export default function DetailTable(props) {
    const {team,table,columns,data,handleDeleteRow,handleAddRow} = props
    const [editMode, setEditMode] = useState(false)
    const classes = useStyles();
    return (

        <MaterialTable
                title={`${team} ${table}`}
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
                        // textAlign:'center'
                     },
                    paging:false,
                    addRowPosition:'first'
                    
                  }}
                  // cellEditable={{
                  //   cellStyle:{color:'red'}
                  // }}
        
                editable={ editMode ? {
                    onRowAdd: newData =>
                      handleAddRow(newData),

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
                      handleDeleteRow(oldData)
                  }
                  :
                  false
                
                }
                actions={[
                    {
                      icon: 'edit',
                      tooltip: 'Edit',
                      onClick: (event, rowData) => {setEditMode(!editMode)},
                      position:'toolbar'
                    }
                  ]}
       
                components={{
                    Toolbar: props => (

                        <div className='detailTable'>
                            <MTableToolbar {...props} classes={{root:classes.toolbar}} />
                        </div>
                         
                    ),
                    EditRow: (tableProps) => {
                        return (
                          <MTableEditRow
                            {...{
                              ...tableProps,
                              onBulkEditRowChanged: () => {},
                            }}
                          />
                        );
                      }
                }}
            
            />
    )
}
