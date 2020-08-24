import React from 'react'
import { useDispatch } from 'react-redux';
import Notify from '@customComponent/Notify';

export default function useActions(addDispatch) {

    const dispatch = useDispatch();
    const toast = Notify();


    const handleAddRow = () => (

        new Promise((resolve,reject)=>{
           
            dispatch(addDispatch)

            .then(response=>{
                toast(response,'success')
                resolve();
            }).catch(error=>{
    
                Object.keys(error).map(err=>{
                    toast(error[err],'error')
                })
                reject();
            })
        })
    
    )


    return { handleAddRow }
}
