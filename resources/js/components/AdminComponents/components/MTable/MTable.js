import React from 'react'

export default function MTable(props) {

    const {columns,
            data,
            loading,
            
    }
    return (
        <MaterialTable
                style={{ boxShadow: 'unset',background:'unset' }}
                title=''
                columns={columns}
                data={clubs}
                isLoading={loading}        
                options={{
                    search:true,
                    actionsColumnIndex: -1,
                    headerStyle: { backgroundColor: '#F1CB29', fontWeight: 'bold' },
                    pageSize:10,
                    addRowPosition:'first',
                    debounceInterval: 500,
                }}
                editable={ editMode ? {
                    onRowAdd: newData =>
                        new Promise((resolve,reject)=>{
                            console.log({newData})
                            dispatch(addClubInTournament(newData.name,tournament_id))
                            .then(response=>{
                                toast(response,'success')
                                resolve();
                            }).catch(error=>{

                                Object.keys(error).map(err=>{
                                    toast(error[err],'error')
                                })
                                reject();
                            })
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                                    
                            dispatch(deleteClubsFromTournament([oldData.id],tournament_id))
                            .then(response=>{
                                toast(response,'success')
                                resolve()
                            }).catch(error=>{
                                Object.keys(error).map(err=>{
                                    toast(error[err],'error')
                                })
                                resolve();
                            })

                        }),
                  }
                  :
                  false
                
                }
                components = {{
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
