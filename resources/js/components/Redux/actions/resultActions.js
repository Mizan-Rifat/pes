export const loadingTrue = () =>{
    return {
        type:'RESULTS_LOADING_TRUE',
    }
}
export const detailLoadingTrue = () =>{
    return {
        type:'RESULTS_DETAIL_PANEL_LOADING_TRUE',
    }
}
export const loadingFalse = () =>{
    return {
        type:'RESULTS_LOADING_FALSE',
    }
}
export const resultDetailsLoadingTrue = () =>{
    return {
        type:'RESULT_DETAILS_LOADING_TRUE',
    }
}
export const resultDetailsLoadingFalse = () =>{
    return {
        type:'RESULT_DETAILS_LOADING_FALSE',
    }
}
export const allResultsFetched = (results) =>{
    return {
        type:'ALL_RESULT_FETCHED',
        payload:results
    }
}
export const resultDetailsFetched = (details) =>{
    return {
        type:'RESULT_DETAILS_FETCHED',
        payload:details
    }
}
export const allResultsFetchedError = (error) =>{
    return {
        type:'SET_ERRORS',
        payload:error
    }
}
export const fixtureCreated = (data) =>{
    return {
        type:'CREATE_FIXTURE',
        payload:data
    }
}
export const fixtureUpdated = (data) =>{
    return {
        type:'UPDATE_FIXTURE',
        payload:data
    }
}

export const eventDeleted = (id,key) =>{
    return {
        type:'EVENT_DELETED',
        payload:{id,key}
    }
}
export const ratingDeleted = (id,key) =>{
    return {
        type:'RATING_DELETED',
        payload:{id,key}
    }
}
export const eventAdded = (event,key) =>{
    return {
        type:'EVENT_ADDED',
        payload:{event,key}
    }
}
export const ratingAdded = (rating,key) =>{
    return {
        type:'RATING_ADDED',
        payload:{rating,key}
    }
}
export const setErrors = (errors) =>{
    return {
        type:'SET_ERRORS',
        payload:errors
    }
}
export const fetchAllResults = (tournament_id) => {
    return (dispatch) => {
        dispatch(loadingTrue())
        axios.get(`/api/tournament/results?tournament_id=${tournament_id}`)
        .then(response=>{
            console.log(response.data.data)
            dispatch(allResultsFetched(response.data.data))
            
        })
        .catch(error=>{
            console.log(error)
            dispatch(allResultsFetchedError(error))

        })
    } 
}
export const fetchResultDetails = (id,admin) => (dispatch) => (

    new Promise((resolve,reject)=>{

        const qs = admin ? '&admin=1' : ''; 
        dispatch(resultDetailsLoadingTrue())
        
        axios.get(`/api/resultdetails?id=${id}${qs}`)
        .then(response=>{
            console.log(response.data.data)
            dispatch(resultDetailsFetched(response.data.data))
            resolve()
            
        })
        .catch(error=>{
            
            switch (error.response.status) {
                case 422:
                    console.log(error.response.data.errors)
                    reject(error.response.data.errors)
                    break;
                case 500:
                    console.log(error.response.data.message)
                    reject({msg:error.response.data.message})
                    break;
                case 404:
                    console.log(error.response.data.message)
                    reject({msg:'Result Not Found'})
                    break;
            
                default:
                    break;
            }
            dispatch(resultDetailsLoadingFalse())
            console.log(error.response.status)
         

        })
    
    })
)

export const createFixture = (newData,tournament_id) => (dispatch) =>

    new Promise((resolve,reject)=>{
        dispatch(loadingTrue())

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/createfixture`,{
                id:newData.id,
                tournament_id:tournament_id,
                team1:newData.team1_details.name,
                team2: newData.team2_details.name,
                date:newData.date,
                group:newData.group,
                round:newData.round,
                leg:newData.leg,
            }).then(response=>{
                dispatch(fixtureCreated(response.data))
                resolve(response.data.message);
            }).catch(error=>{
                dispatch(setErrors(error.response.data.errors))
                reject(error.response.data.errors);

            })
        })
    });

export const updateFixture = (newData) => (dispatch) =>

    new Promise((resolve,reject)=>{

        dispatch(loadingTrue())

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/updatefixture`,{
                id:newData.id,
                team1:typeof newData.team1_details.name === 'number' ? newData.team1_details.name : newData.team1_details.id ,
                team2:typeof newData.team2_details.name === 'number' ? newData.team2_details.name : newData.team2_details.id,
                date:newData.date,
                group:newData.group,
                round:newData.round,
                leg:newData.leg,
            }).then(response=>{
                dispatch(fixtureUpdated(response.data))
                resolve(response.data.message);
            }).catch(error=>{
                dispatch(setErrors(error.response.data.errors))
                reject(error.response.data.errors);

            })
        })
    });

export const deleteEvent = (id,key) => (dispatch) =>(

    new Promise((resolve,reject)=>{
        // dispatch(loadingTrue())
        console.log({key})
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/result/delete/event`,{
                id
            }).then(response=>{
                dispatch(eventDeleted(id,key))
                resolve(response.data.message)
            }).catch(error=>{
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
export const deleteRating = (id,key) => (dispatch) =>(

    new Promise((resolve,reject)=>{
        
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/result/delete/rating`,{
                id
            }).then(response=>{
                dispatch(ratingDeleted(id,key))
                resolve(response.data.message)
            }).catch(error=>{
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
export const addEvent = (data,key) => (dispatch) =>(

    new Promise((resolve,reject)=>{
        
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/result/add/event`,data).then(response=>{

                dispatch(eventAdded(response.data.event,key))
               
                resolve(response.data.message)

            }).catch(error=>{

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
export const addRating = (data,key) => (dispatch) =>(

    new Promise((resolve,reject)=>{
        
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/result/add/rating`,data).then(response=>{

                dispatch(ratingAdded(response.data.rating,key))
               
                resolve(response.data.message)

            }).catch(error=>{
                
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
