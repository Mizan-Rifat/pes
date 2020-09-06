


export const postAction = (actions,url,formData,dispatch) =>(

    new Promise((resolve,reject)=>{

        dispatch(actions.loading())

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(url,formData)
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
