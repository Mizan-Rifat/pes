import React from 'react';
import MaterialTable,{MTableToolbar,MTableEditRow} from 'material-table'


export default function DetailPanelWithRowClick() {
        return (
          <div className='resultTable'>
              <MaterialTable
                columns={[
                  { title: 'Name', field: 'name' },
                  { title: 'Surname', field: 'surname' },
                  { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                  {
                    title: 'Birth Place',
                    field: 'birthCity',
                    lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                  },
                ]}
                data={[
                  { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                  { name: 'Zerya Betül', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                ]}
                title="Detail Panel With RowClick Preview"
                detailPanel={[
                  rowData => ({
                    icon:'',
                    render: () => <div>content</div>,
                  })
                ]}
                onRowClick={(event, rowData, togglePanel) => togglePanel()}
                icon='edit'
              />
          </div>
        )
      }
      
