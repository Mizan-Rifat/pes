import { postAction, getAction } from "./actions"

export const loadingTrue = () =>{
    return {
        type:'GINFO_LOADING_TRUE',
    }
}
export const loadingFalse = () =>{
    return {
        type:'GINFO_LOADING_FALSE',
    }
}
export const fetchingTrue = () =>{
    return {
        type:'GINFO_FETCHING_TRUE',
    }
}
export const fetchingFalse = () =>{
    return {
        type:'GINFO_FETCHING_FALSE',
    }
}
export const setGinfo = (data) =>{
    return {
        type:'SET_GINFO',
        payload:data
    }
}


export const setErrors = (error) =>{
    return {
        type:'SET_ERRORS',
        payload:error
    }
}

export const fetchGinfo = () => (dispatch) =>{
  
    const url =`/api/ginfo`,
    actions={
        loading:fetchingTrue,
        success:setGinfo,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}


export const updateGinfo = (data) => (dispatch) => {
 
    const url ='/api/ginfo/update';
    const actions={
        loading:loadingTrue,
        success:setGinfo,
        error:setErrors
    }
    return postAction(actions,url,data,dispatch);
}


