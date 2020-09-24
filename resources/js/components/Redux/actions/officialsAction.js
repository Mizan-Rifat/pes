import { postAction, getAction } from "./actions"

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
export const fetchingTrue = () =>{
    return {
        type:'OFFICIALS_FETCHING_TRUE',
    }
}
export const fetchingFalse = () =>{
    return {
        type:'OFFICIALS_FETCHING_FALSE',
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

export const fetchOfficials = (id) => (dispatch) =>{
  
    const url =`/api/tournament/officials?tournament_id=${id}`,
    actions={
        loading:fetchingTrue,
        success:offcialsFetched,
        error:setError
    }
    return getAction(actions,url,dispatch);
}


export const addOfficials = (data) => (dispatch) => {

    const url ='/api/tournament/officials/add';
    const actions={
        loading:loadingTrue,
        success:officialsAdded,
        error:setError
    }
    return postAction(actions,url,data,dispatch);
}


export const deleteOfficials = (data) => (dispatch) => {
 
    const url ='/api/tournament/officials/remove';
    const actions={
        loading:loadingTrue,
        success:officialDeleted,
        error:setError
    }
    return postAction(actions,url,data,dispatch);
}


