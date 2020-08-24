import React from 'react';
import {useSelector} from 'react-redux';
import SelectComp from '@customComponent/SelectComp'
 
export default function EditComponent({type,defaultValue,options,props,name,reducer}) {

    const {error} = useSelector(state => state.users);

    return (
        
            <>

                {
                    type === 'date' &&
                        <SelectComp 
                            type={'date'}
                            defaultValue={props.rowData.email} 
                            props={props}
                            options={[]}
                            name='email'
                            reducer='users'
                        />
                }
                {
                    type ==='input' &&
                        <SelectComp 
                            type={'input'}
                            defaultValue={props.rowData.email} 
                            props={props}
                            options={[]}
                            name='email'
                            reducer='users'
                        />
                }
                {
                    type === 'select' &&
                        <SelectComp 
                            type={'select'}
                            defaultValue={props.rowData.email} 
                            props={props}
                            options={[]}
                            name='email'
                            reducer='users'
                        />

                }


            </>
        
    )
}
