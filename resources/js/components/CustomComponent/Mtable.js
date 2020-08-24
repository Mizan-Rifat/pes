import React, { useState } from 'react';
import MaterialTable,{MTableToolbar,MTableEditRow} from 'material-table'

export default function Mtable(props) {

    const {columns,data,handleAddRow,handleUpdateRow,handleDeleteRow,handleBulkUpdate,edit} = props;

    const {title = ''} = props;
    const {detailPanel,actions = []} = props;
    const {components,header = {}} = props;
    const {paging,search,editable,sorting= true} = props;
    const {selectMode,loading,headerLess,onRowClick= false} = props;
    const {pageSize = 10} = props;

    const headerStyle = {
      backgroundColor: headerLess ? '' : '#F1CB29',
      fontWeight: 'bold',
      ...header
    }


    const [editMode, setEditMode] = useState(edit)

    return (
        <MaterialTable
                style={{ boxShadow: 'unset',background:'unset' }}
                title={title}
                columns={columns}
                data={data}
                isLoading={loading}
                className='newClass'
                options={{
                    search:search,
                    actionsColumnIndex: -1,
                    headerStyle: headerStyle,
                    pageSize:pageSize,
                    selection: editMode && selectMode,
                    paging:paging,
                    sorting:sorting,
                    addRowPosition:'first',
                    rowStyle: (rowData, index) => {
                      if (index % 2) {
                          return {backgroundColor: "#f2f2f2"}
                      }
                  }
                    
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
                        newData => handleBulkUpdate(newData) : false,

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
    )
}
