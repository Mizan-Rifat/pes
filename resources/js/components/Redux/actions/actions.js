export const postAction = (actions,url,formData,dispatch,config={}) =>(

    new Promise((resolve,reject)=>{
        
        dispatch(actions.loading())

        axios.get('/sanctum/csrf-cookie')
        .then(response => {
            
            axios.post(url,formData,config)
                .then(response=>{
                    dispatch(actions.success(response.data.data))
                    resolve(response.data.message)
                }).catch(error=>{
                    
                    const err = {
                        errors:error.response.data.hasOwnProperty('errors') ? error.response.data.errors : {},
                        message:error.response.data.message,
                        errorCode:error.response.status
                    }
        
                    dispatch(actions.error(err))
        
                    reject(err);
                    
                })
        })
    })
);
export const getAction = (actions,url,dispatch) =>(

    new Promise((resolve,reject)=>{
        
        dispatch(actions.loading())

        axios.get(url)
            .then(response=>{
                if(actions.hasOwnProperty('success')){
                    dispatch(actions.success(response.data.data))
                }
                
                resolve(response.data.message)
            }).catch(error=>{
                
                const err = {
                    errors:error.response.data.hasOwnProperty('errors') ? error.response.data.errors : {},
                    message:error.response.data.message,
                    errorCode:error.response.status
                }
    
                dispatch(actions.error(err))
    
                reject(err);
                
            })
    })
);
