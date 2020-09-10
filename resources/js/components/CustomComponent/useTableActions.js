import React from 'react'
import { useDispatch } from 'react-redux'
import Notify from '@customComponent/Notify';


export default function useTableActions(actions) {

    const dispatch = useDispatch();
    const toast = Notify();

    const handleAddRow = (data) => (
            
        new Promise((resolve,reject)=>{
      
            dispatch(actions.add(data))

            .then(response=>{
                toast(response,'success')
                resolve();
            }).catch(error=>{
                Object.keys(error.errors).map(err=>{
                    toast(error.errors[err],'error')
                })
                reject();
            })
        })
    )

    const handleUpdateRow = (newData) => (

        new Promise((resolve,reject)=>{
            
            dispatch(actions.update(newData))
            .then(response=>{
                toast(response,'success')
                resolve();
            }).catch(error=>{
               
                Object.keys(error.errors).map(err=>{
                    toast(error.errors[err],'error')
                })
                reject();
            })
        })
    )

    const handleDeleteRow = (args) => (
        
        new Promise((resolve, reject) => {
                            
            dispatch(actions.delete(args))
            .then(response=>{
                toast(response,'success')
                resolve()
            }).catch(error=>{
                Object.keys(error.errors).map(err=>{
                    toast(error.errors[err],'error')
                })
                reject();
            })

        })
    )


    return {handleAddRow,handleUpdateRow,handleDeleteRow}
}