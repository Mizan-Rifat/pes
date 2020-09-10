import { getAction,postAction } from "./actions"

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
export const fetchingTrue = () =>{
    return {
        type:'ADD_RESULT_FETCHING_TRUE',
    }
}

export const fetchingFalse = () =>{
    return {
        type:'ADD_RESULT_FETCHING_FALSE',
    }
}

export const addEventToState = (event,label) =>{
    return {
        type:'ADD_EVENT_TO_STATE',
        payload:{event,label}
    }
}
export const eventUpdated = (event) =>{
    return {
        type:'EVENT_UPDATED',
        payload:event
    }
}
export const addTeam1EventToState = (event) =>{
    return {
        type:'ADD_TEAM1_EVENT_TO_STATE',
        payload:event
    }
}
export const addTeam2EventToState = (event) =>{
    return {
        type:'ADD_TEAM2_EVENT_TO_STATE',
        payload:event
    }
}
export const removeEventFromState = (team,id) =>{
    return {
        type:'REMOVE_EVENT_FROM_STATE',
        payload:{team,id}
    }
}

export const addRatingToState = (ratings,team) =>{
    return {
        type:'ADD_RATING_TO_STATE',
        payload:{ratings,team}
    }
}


export const fixtureDetailsFetched = (data) =>{
    return {
        type:'FIXTURE_DETAILS_FETCHED',
        payload:data
    }
}
export const submittedResultFetched = (data) =>{
    return {
        type:'SUBMITTED_RESULT_FETCHED',
        payload:data
    }
}
export const resetAddResult = () =>{
    return {
        type:'ADD_RESULT_RESET',
        
    }
}
export const addImages = (label,images) =>{
    return {
        type:'SET_IMAGES',
        payload:{label,images}
    }
}

export const setErrors = (error) =>{
    return {
        type:'SET_ADD_RESULT_ERRORS',
        payload:error
    }
}

export const fetchFixtureDetails = (fixture_id) => (dispatch) =>{
  
    const url = `/api/fixture?fixture_id=${fixture_id}&players=1`,
    actions={
        loading:fetchingTrue,
        success:fixtureDetailsFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}
export const fetchSubmittedResult = (fixture_id) => (dispatch) =>{
  
    const url = `http://127.0.0.1:8000/api/result/submitted?fixture_id=${fixture_id}`,
    actions={
        loading:fetchingTrue,
        success:submittedResultFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
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


export const addMatchResult = (data,config) => (dispatch) => {
    
    const url ='/api/result/add',
    actions={
        loading:loadingTrue,
        success:loadingFalse,
        error:setErrors
    }
    return postAction(actions,url,data,dispatch,config);
}
export const updateEvent = (data) => (dispatch) => {
    
    const url ='/api/result/update/event',
    actions={
        loading:loadingTrue,
        success:eventUpdated,
        error:setErrors
    }
    return postAction(actions,url,data,dispatch);
}
export const addEvent = (data) => (dispatch) => {
    
    const url ='/api/result/update/event',
    actions={
        loading:loadingTrue,
        success:eventUpdated,
        error:setErrors
    }
    return postAction(actions,url,data,dispatch);
}

export const eventAdded = (data) => (dispatch) => {
    
}