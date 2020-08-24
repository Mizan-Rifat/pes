
export const loadingTrue = () =>{
    return {
        type:'USERS_LOADING_TRUE',
    }
}

export const loadingFalse = () =>{
    return {
        type:'USERS_LOADING_FALSE',
    }
}
export const allUsersFetched = (users) =>{
    return {
        type:'ALL_USER_FETCHED',
        payload:users
    }
}

export const allUsersFetchedError = (error) =>{
    return {
        type:'ALL_USERS_FETCHED_ERROR',
        payload:error.message
    }
}
export const userUpdatedError = (errors) =>{
    return {
        type:'SET_ERRORS',
        payload:errors
    }
}
export const userUpdated = (data) =>{
    return {
        type:'UPDATE_USER',
        payload:data
    }
}
export const userDeleted = (ids,message) =>{
    return {
        type:'DELETE_USER',
        payload:{ids,message}
    }
}
export const userBlocked = (ids) =>{
    return {
        type:'BLOCK_USER',
        payload:ids
    }
}

export const fetchAllUsers = () => {
    return (dispatch) => {
        dispatch(loadingTrue())
        axios.get(`/api/allusers`)
        .then(response=>{
            console.log(response.data.data)
            dispatch(allUsersFetched(response.data.data))
            
        })
        .catch(error=>{
            console.log(error)
            dispatch(allUsersFetchedError(error))

        })
    } 
}

export const updateUser = (newData) => (dispatch) =>

    new Promise((resolve,reject)=>{

        dispatch(loadingTrue())

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/updateuser`,{
                ...newData
            }).then(response=>{
                dispatch(userUpdated(response.data))
                resolve(response.data.message);
            }).catch(error=>{
                dispatch(userUpdatedError(error.response.data.errors))
                reject(error.response.data.errors);

            })
        })
    });
        

export const deleteUser = (ids) => (dispatch) =>(

    new Promise((resolve,reject)=>{
        dispatch(loadingTrue())
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/deleteuser`,{
                id:ids
            }).then(response=>{
                dispatch(userDeleted(ids,response.data.message))
                resolve(response.data.message)
            }).catch(error=>{
                dispatch(loadingFalse())
                reject(error.response.data.message)
            })
        })
    })
);

export const blockUser = (ids) => (dispatch) =>(

    new Promise((resolve,reject)=>{
        dispatch(loadingTrue())
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/blockusers`,{
                ids:ids
            }).then(response=>{
                dispatch(userBlocked(ids))
                resolve(response.data.message)
            }).catch(error=>{
                dispatch(loadingFalse())
                console.log({error})
                reject(error.response.data.message)
            })
        })
    })

);


