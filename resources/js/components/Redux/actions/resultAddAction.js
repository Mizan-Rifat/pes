export const loadingTrue = () =>{
    return {
        type:'ADD_RESULT_LOADING_TRUE',
    }
}

export const loadingFalse = () =>{
    return {
        type:'ADD_RESULT_LOADING_FALSE',
    }
}
export const addEventToState = (newData) =>{
    return {
        type:'ADD_EVENT_TO_STATE',
        payload:newData
    }
}
export const removeEventFromState = (id) =>{
    return {
        type:'REMOVE_EVENT_FROM_STATE',
        payload:{id}
    }
}

export const fixtureDetailsFetched = (data) =>{
    return {
        type:'FIXTURE_DETAILS_FETCHED',
        payload:data
    }
}

export const fetchFixtureDetails = (fixture_id) => {
    return (dispatch) => {
        dispatch(loadingTrue())
        axios.get(`/api/fixture?fixture_id=${fixture_id}&players=1`)
        .then(response=>{

            dispatch(fixtureDetailsFetched(response.data.data))
            
        })
        .catch(error=>{
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
    } 
}



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
        
    })
);
