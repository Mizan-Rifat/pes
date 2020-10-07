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

                if(error.errorCode == 422){
                    Object.keys(error.errors).map(err=>{
                        toast(error.errors[err],'error')
                    })
                }else{
                    toast(error.message,'error')
                }
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
               
                if(error.errorCode == 422){
                    Object.keys(error.errors).map(err=>{
                        toast(error.errors[err],'error')
                    })
                }else{
                    toast(error.message,'error')
                }
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
                console.log({error})
                if(error.errorCode == 422){
                    Object.keys(error.errors).map(err=>{
                        toast(error.errors[err],'error')
                    })
                }else{
                    toast(error.message,'error')
                }
                reject();
            })

        })
    )


    return {handleAddRow,handleUpdateRow,handleDeleteRow}
}
