import React,{useState} from 'react';
import MaterialTable,{MTableToolbar,MTableEditRow, } from 'material-table';
import {makeStyles, colors} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Mtable from '@customComponent/Mtable';

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
    const classes = useStyles();

  

    return (

          <Mtable 
              title={`${team} ${table}`}
              columns={columns}
              data={data}
              search={false}
              paging={false}
              handleAddRow={handleAddRow}
              // handleUpdateRow={}
              handleDeleteRow={handleDeleteRow}
              components={{
                Toolbar: props => (

                  <div className='detailTable'>
                      <MTableToolbar {...props} classes={{root:classes.toolbar}} />
                  </div>
                  
                ),
              }}
          
          />


    )
}
