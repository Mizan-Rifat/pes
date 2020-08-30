import React, { useState } from 'react';
import MaterialTable,{MTableToolbar,MTableEditRow} from 'material-table'
import { tableTheme } from "@assets/jss/material-dashboard-react.js";
import { createMuiTheme,makeStyles,ThemeProvider  } from '@material-ui/core/styles';

const theme1 = createMuiTheme({
  overrides: {
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

  },
});
const theme2 = createMuiTheme({
  overrides: {
    MuiTableRow:{
          root:{
            '&:hover':{
              background:'#454545 !important',
              color:'#FFFFE7 !important'
            }
          }
    }
  }
});

export default function Mtable(props) {

    const {columns,data,handleAddRow,handleUpdateRow,handleDeleteRow,handleBulkUpdate,edit,addLast,onOrderChange} = props;

    const {title = ''} = props;
    const {detailPanel,actions = []} = props;
    const {components,header = {}} = props;
    const {paging,search,editable,sorting = true} = props;
    const {selectMode,loading,headerLess,onRowClick,thirdSortClick,draggable,hoverable= false} = props;
    const {pageSize = 10} = props;

    const headerStyle = {
      ...tableTheme,
      ...header,
    }

    const [editMode, setEditMode] = useState(edit)


    return (
      <ThemeProvider theme={{...theme1,...(hoverable && theme2) }}>
        <MaterialTable
                style={{ boxShadow: 'unset',background:'unset' }}
                title={title}
                columns={columns}
                data={data}
                isLoading={loading}
                className='newClass'
                onOrderChange={onOrderChange}
                options={{
                    search:search,
                    actionsColumnIndex: -1,
                    headerStyle: headerLess ? {backgroundColor:'#eee'} : headerStyle,
                    pageSize:pageSize,
                    draggable:draggable,
                    selection: editMode && selectMode,
                    paging:paging,
                    sorting:sorting,
                    thirdSortClick:thirdSortClick,
                    addRowPosition: addLast ? 'last' : 'first',
                    // rowStyle: (rowData, index) => {
                    //   if (index % 2) {
                    //       return {backgroundColor: "#f2f2f2"}
                    //   }
                      rowStyle:(rowData, index) => ({
                        "&:hover": { backgroundColor: "#red !important" }
                        })
                  // }
                    
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
                  //   Toolbar: props => (

                  //     <div className='detailTable'>
                  //         <MTableToolbar {...props} />
                  //     </div>
                       
                  // ),
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
