import React from 'react';
import MaterialTable from 'material-table'
import Mtable from '@customComponent/Mtable'; 

export default function BulkEdit() {
  const { useState } = React;

  const [columns, setColumns] = useState([
    { 
      field: 'key' ,
      editable: 'never'
    },
    { 
      field: 'surname',
      render:rowData=> ':',
      editable: 'never'
     },
    { 
      field: 'value', 
    },
    
  ]);

  const [data, setData] = useState([
    { 
      key:'User Name',
      value:'Mizan',
    },
    { 
      key:'Email',
      value:'Mizan@mail.com',
    },
    { 
      key:'FB id',
      value:'fb.com/mizan'
    },
  ]);
  const handleBulkUpdate = (changes) => (

    new Promise((resolve,reject)=>{
     
    console.log({changes})
        const updatedData = ratings.map((item,index)=>(
            Object.keys(changes).includes(index.toString()) ? 
                changes[index].newData
                :
                item
        ))
      
        dispatch(addRatingToState(updatedData,team))
        resolve();

    })
)

  return (
    <div>
        <Mtable 
            columns={columns}
            data={data}
            title='Ratings'
            handleBulkUpdate={handleBulkUpdate}
            header={{padding:'8px'}}
            edit={true}
            sorting={false}
            
        
        />
    </div>
  )
}

