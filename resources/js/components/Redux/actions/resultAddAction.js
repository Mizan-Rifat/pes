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

export const addEventToState = (event) =>{
    return {
        type:'ADD_EVENT_TO_STATE',
        payload:event
    }
}
export const eventUpdated = (event) =>{
    return {
        type:'EVENT_UPDATED',
        payload:event
    }
}

export const removeEventFromState = (id) =>{
    return {
        type:'REMOVE_EVENT_FROM_STATE',
        payload:{id}
    }
}

export const addRatingToState = (ratings) =>{
    return {
        type:'ADD_RATING_TO_STATE',
        payload:ratings
    }
}
export const ratingsUpdated = (ratings) =>{
    return {
        type:'RATINGS_UPDATED',
        payload:ratings
    }
}
export const ratingsEdited = (ratings) =>{
    return {
        type:'RATINGS_EDITED',
        payload:ratings
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
export const setImages = (label,images) =>{
    return {
        type:'SET_IMAGES',
        payload:{label,images}
    }
}
export const imageDeleted = (id) =>{
    return {
        type:'IMAGE_DELETED',
        payload:{id}
    }
}
export const imageAdded = (images) =>{
    return {
        type:'IMAGE_ADDED',
        payload:images
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
        error:imageAdded
    }
    return getAction(actions,url,dispatch);
}


export const fetchSubmittedResult = (fixture_id) => (dispatch) =>{
  
    const url = `/api/result/submitted?fixture_id=${fixture_id}`;
    const actions={
        loading:fetchingTrue,
        success:submittedResultFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}



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
    
    const url ='/api/result/event/add',
    actions={
        loading:loadingTrue,
        success:addEventToState,
        error:setErrors
    }
    return postAction(actions,url,data,dispatch);
}
export const deleteEvent = (id) => (dispatch) => {
    
    const url ='/api/result/event/delete',
    actions={
        loading:loadingTrue,
        success:removeEventFromState,
        error:setErrors
    }
    return postAction(actions,url,id,dispatch);
}

export const deleteimage = (id) => (dispatch) => {
    
    const url ='/api/result/image/delete',
    actions={
        loading:loadingTrue,
        success:imageDeleted,
        error:setErrors
    }
    return postAction(actions,url,id,dispatch);
}
export const addImages = (data,config) => (dispatch) => {
    
    const url ='/api/result/image/add',
    actions={
        loading:loadingTrue,
        success:imageAdded,
        error:setErrors
    }
    return postAction(actions,url,data,dispatch,config);
}
export const updateRatings = (data) => (dispatch) => {
    
    const url ='/api/result/ratings/update',
    actions={
        loading:loadingTrue,
        success:ratingsEdited,
        error:setErrors
    }
    return postAction(actions,url,data,dispatch);

}
export const approveResult = (data) => (dispatch) => {
    
    const url ='/api/result/approve',
    actions={
        loading:loadingTrue,
        success:loadingFalse,
        error:setErrors
    }
    return postAction(actions,url,data,dispatch);
}