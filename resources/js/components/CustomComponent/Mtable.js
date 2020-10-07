import React, { useState } from 'react';
import MaterialTable,{MTableToolbar,MTableEditRow} from 'material-table'
import { tableTheme } from "@assets/jss/material-dashboard-react.js";
import { createMuiTheme,makeStyles,ThemeProvider  } from '@material-ui/core/styles';


const theme1 = {
  
    MuiTableSortLabel: {
      root: {
        color: '#fff',
        '&:hover': {
          color: '#bbdefb',
        },
        '&:focus': {
          color: '#bbdefb',
        },
      },
      active: {
        color: '#bbdefb !important',
      },
      icon: {
        color: '#bbdefb !important',
      },
    },

    MuiTypography:{
      h6:{
        fontSize:'14px',
        fontWeight:700
      }
    },

    

    


}

const frTheme = {
  MuiTableRow:{
    root:{
      ['@media (max-width:660px)']:{
        display:'table',
        width:'100%',
        borderBottom:'1px solid rgba(224, 224, 224, .5)',
        borderTop:'1px solid rgba(224, 224, 224, .5)'
      }
    }
  },
  MuiTableCell:{
    root:{
      ['@media (max-width:660px)']:{
          display:'table-row',
          borderBottom:'unset'
      }
    }
  }
}

const theme2 = {

    MuiTableRow:{
          root:{
            '&:hover':{
              background:'#454545 !important',
              color:'#FFFFE7 !important'
            },
            borderBottom:'none'
          }
    }
  
};
const theme3 = {

  MuiToolbar:{
    root:{
      padding:'0 !important',
      minHeight:'unset !important'
    }
  }
  
};



export default function Mtable(props) {

    const {columns,data,handleAddRow,handleUpdateRow,handleDeleteRow,handleBulkUpdate,edit,addLast,onOrderChange,frTable,toolbarLess,tableRef,onChangePage,onSearchChange} = props;

    const {title = ''} = props;
    const {detailPanel,actions = []} = props;
    const {components,header = {}} = props;
    const {paging,search,editable,sorting = true} = props;
    const {selectMode,loading,headerLess,onRowClick,thirdSortClick,draggable,hoverable= false} = props;
    const {pageSize = 10} = props;

    const headerStyle = {
    
        background:headerLess ? 'unset' : '#0E1723',
        color:'#fff',
        fontWeight:'bold',
        ...header,
    }

    const [editMode, setEditMode] = useState(edit)

    const theme = createMuiTheme({
      overrides:{
        ...theme1,
        ...(frTable && frTheme),
        ...(hoverable && theme2),
        ...(toolbarLess && theme3)
      }
    })

    return (
      <ThemeProvider theme={theme}>
        <MaterialTable
                tableRef={tableRef}
                style={{ boxShadow: 'unset',background:'unset' }}
                title={title}
                columns={columns}
                data={data}
                isLoading={loading}
                className='newClass'
                onOrderChange={onOrderChange}
                onChangePage={onChangePage}
                onSearchChange={onSearchChange}
                options={{
                    search:search,
                    actionsColumnIndex: -1,
                    headerStyle: headerStyle,
                    // headerStyle: headerLess ? {backgroundColor:'#eee'} : headerStyle,
                    pageSize:pageSize,
                    draggable:draggable,
                    selection: editMode && selectMode,
                    paging:paging,
                    sorting:sorting,
                    thirdSortClick:thirdSortClick,
                    addRowPosition: addLast ? 'last' : 'first',
                    padding:'dense',
                    rowStyle:{
                      fontSize:'12px'
                    },
                    // debounceInterval:2000

                      
                    
                }}

                actions={[
                  
                    {
                      icon: 'edit',
                      iconProps: { style: { color: editMode ? 'black' : '' } },
                      tooltip: 'Edit Mode',
                      onClick: (event, rowData) => {setEditMode(!editMode)},
                      position:'toolbar',
                      hidden:!editable
                    },
                    ...actions
                  
                ]}
                
                editable={ editMode ? {
                    
                    onBulkUpdate: handleBulkUpdate ? 
                        changes => handleBulkUpdate(changes) : false,

                    onRowAdd: handleAddRow ? 
                        newData => handleAddRow(newData) : false,

                    onRowUpdate: handleUpdateRow ? 
                        newData => handleUpdateRow(newData) : false,

                    onRowDelete: handleDeleteRow ? 
                        oldData => handleDeleteRow(oldData) : false,
                  }
                  :
                  false
                
                }

                components={{

                    ...components,
                    // Toolbar: props => (
    
                    //         <div className='detailTable'>
                    //             <MTableToolbar {...props}  />
                    //         </div>
                            
                    //       ),
                    EditRow: 
                    
                    handleBulkUpdate ? 

                    
                      (tableProps) => {
                        return (
                          <MTableEditRow {...tableProps} />
                        );
                      }
                      :
                       (tableProps) => {
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

                detailPanel={detailPanel}
                onRowClick={onRowClick}

            
            />
    </ThemeProvider>
    )
}
