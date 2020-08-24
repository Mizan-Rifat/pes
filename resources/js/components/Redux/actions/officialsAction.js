export const loadingTrue = () =>{
    return {
        type:'OFFICIALS_LOADING_TRUE',
    }
}
export const loadingFalse = () =>{
    return {
        type:'OFFICIALS_LOADING_FALSE',
    }
}
export const offcialsFetched = (data) =>{
    return {
        type:'OFFICIALS_FETCHED',
        payload:data
    }
}
export const officialsAdded = (official) =>{
    return {
        type:'OFFICIALS_ADDED',
        payload:official
    }
}
export const officialDeleted = (user_ids) =>{
    return {
        type:'OFFICIALS_DELETED',
        payload:user_ids
    }
}

export const setError = (error) =>{
    return {
        type:'SET_ERRORS',
        payload:error
    }
}

export const fetchOfficials = (id) => (dispatch) => {
    dispatch(loadingTrue())
    axios.get(`/api/tournament/officials?tournament_id=${id}`)
    .then(response=>{
        dispatch(offcialsFetched(response.data.data))
    })
    .catch(error=>{
        dispatch(setError(error))

    })
};

export const addOfficials = (user_id,tournament_id) => (dispatch) =>(

    new Promise((resolve,reject)=>{
        dispatch(loadingTrue())
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/tournament/officials/add`,{
                user_id,
                tournament_id
              }).then(response=>{
                dispatch(officialsAdded(response.data.official))
                resolve(response.data.message)
            }).catch(error=>{
                dispatch(loadingFalse())

                switch (error.response.status) {
                    case 422:
                        console.log(error.response.data.errors)
                        reject(error.response.data.errors)
                        break;
                    case 500:
                        console.log(error.response.data.message)
                        reject({msg:error.response.data.message})
                        break;
                
                    default:
                        break;
                }
            })
        })
    })
);

export const deleteOfficials = (ids) => (dispatch) =>(

    new Promise((resolve,reject)=>{
        dispatch(loadingTrue())
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/tournament/officials/remove`,{
                ids
            }).then(response=>{
                dispatch(officialDeleted(ids))
                resolve(response.data.message)
            }).catch(error=>{
                dispatch(loadingFalse())
                reject({msg:error.response.data.message})
            })
        })
    })
);