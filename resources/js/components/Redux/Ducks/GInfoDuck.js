import { postAction, getAction } from "./actions";

//urls

const fetch_ginfo_url = `/api/ginfo`;
const update_gInfo_url = `/api/ginfo/update`;


//actions

const SET_GINFO = 'pes/ginfo/ginfo_fetched';
const GINFO_UPDATED = 'pes/ginfo/ginfo_updated';

const LOADING_TRUE = 'pes/ginfo/loading_true';
const LOADING_FALSE = 'pes/ginfo/loading_false';
const FETCHING_TRUE = 'pes/ginfo/fetching_true';
const FETCHING_FALSE = 'pes/ginfo/fetching_false';
const SET_ERRORS = 'pes/ginfo/set_errors';

// reducers

const initState = {
    fetching:true,
    loading:false,
    ginfo:{},
    error:{},
};

export default (state=initState,action)=>{
    switch (action.type) {
        case SET_GINFO:
            
            return {
                ...state,
                fetching:false,
                loading:false,
                ginfo:action.payload,
                
            }
   
        case LOADING_TRUE:
            
            return {
                ...state,
                loading:true
            }
        case LOADING_FALSE:
            
            return {
                ...state,
                loading:false
            }
        case FETCHING_TRUE:
            
            return {
                ...state,
                fetching:true
    
            }
        case FETCHING_FALSE:
            
            return {
                ...state,
                fetching:false,
            }
        case SET_ERRORS:
            
            return {
                ...state,
                loading:false,
                fetching:false,
                error:action.payload
            }
    
        default:
            return state;
    }
}

// action_creators

export const ginfoFetched = (data) =>{
    return {
        type:SET_GINFO,
        payload:data
    }
}
export const ginfoUpdated = (data) =>{
    return {
        type:SET_GINFO,
        payload:data
    }
}
export const setErrors = (error) =>{
    return {
        type:SET_ERRORS,
        payload:error
    }
}

export const fetchGinfo = () => (dispatch) =>{

    const url = fetch_ginfo_url,
    actions={
        loading:{type:FETCHING_TRUE},
        success:ginfoFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}

export const updateGinfo = (data) => (dispatch) => {
 
    const url = update_gInfo_url;
    const actions={
        loading:{type:LOADING_TRUE},
        success:ginfoUpdated,
        error:setErrors
    }
    return postAction(actions,url,data,dispatch);
}
