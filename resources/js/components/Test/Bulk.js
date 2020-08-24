import React from "react";
import MaterialTable from "material-table";
import Mtable from "@customComponent/Mtable";
import { reject } from "lodash";


function App() {
  const { useState } = React;

  const [columns, setColumns] = useState([
    { title: "Name", field: "name" },
    {
      title: "Surname",
      field: "surname",
      initialEditValue: "initial edit value"
    },
    { title: "Birth Year", field: "birthYear", type: "numeric" },
    {
      title: "Birth Place",
      field: "birthCity",
      lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
    }
  ]);

  const [data, setData] = useState([
    { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
    { name: "Zerya Betül", surname: "Baran", birthYear: 2017, birthCity: 34 }
  ]);

  const handleAddRow = (newData) => (

    new Promise((resolve,reject)=>{
      console.log({newData})
      resolve()
    })

  )
  const handleUpdateRow = (newData) => (

    new Promise((resolve,reject)=>{
      console.log({newData})
      resolve()
    })

  )
  const handleDeleteRow = (newData) => (

    new Promise((resolve,reject)=>{
      console.log({newData})
      resolve()
    })

  )

  const actions = [
    {
      tooltip: 'Remove Selected',
      icon: 'delete',
      onClick: (event, data) => console.log(data),
      
      
    },
    {
        icon: 'edit',
        tooltip: 'Edit Selected',
        onClick: (event, data) => handleMultipleEdit(event,data),
       
        
    },
  ]
 
  return (
    // <MaterialTable
    //   title="Bulk Edit Preview"
    //   columns={columns}
    //   data={data}
    //   editable={{
    //     onBulkUpdate: (changes) =>
        
    //       new Promise((resolve, reject) => {
    //         console.log(changes)
    //           resolve();
            
    //       }),
    //     onRowDelete: (oldData) =>
    //       new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //           resolve();
    //         }, 1000);
    //       })
    //   }}
    // />

    <Mtable 
      columns={columns} 
      data={data} 
      handleUpdateRow={handleUpdateRow} 
      handleAddRow={handleAddRow} 
      handleDeleteRow={handleDeleteRow} 
      editMode={true}
      // actions={actions}
    />
  );
}

export default App;

  