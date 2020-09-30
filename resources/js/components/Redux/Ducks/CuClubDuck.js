import { postAction, getAction } from "./actions";

//urls

const fetch_cuclub_url = (id)=>`/api/`;
const create_cuclub_url = `/api/club`;
const update_cuclub_url = (id)=>`/api/club/${id}`;


//actions

const SET_CUCLUB = 'pes/cuclub/set_cuclub';
const CUCLUB_FETCHED = 'pes/cuclub/cuclub_fetched';
const CUCLUB_CREATED = 'pes/cuclub/cuclub_created';
const CUCLUB_UPDATED = 'pes/cuclub/cuclub_updated';

const LOADING_TRUE = 'pes/cuclub/loading_true';
const LOADING_FALSE = 'pes/cuclub/loading_false';
const FETCHING_TRUE = 'pes/cuclub/fetching_true';
const FETCHING_FALSE = 'pes/cuclub/fetching_false';
const SET_ERRORS = 'pes/cuclub/set_errors';

// reducers

const initState = {
    fetching:true,
    loading:false,
    club:[],
    error:{},
};

export default (state=initState,action)=>{
    switch (action.type) {

        case SET_CUCLUB:
        case CUCLUB_FETCHED:
            
            return {
                ...state,
                fetching:false,
                loading:false,
                club:action.payload,
                
            }

        case CUCLUB_CREATED:
            
            return {
                ...state,
                loading:false,
                club:action.payload,
                
            }
        case CUCLUB_UPDATED:
            
            return {
                ...state,
                loading:false,
                club:action.payload,
                
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

export const cuclubFetched = (data) =>{
    return {
        type:CUCLUB_FETCHED,
        payload:data
    }
}
export const setCuClub = (data) =>{
    return {
        type:SET_CUCLUB,
        payload:data.club
    }
}

export const cuClubUpdated = (data) =>{
    return {
        type:CUCLUB_UPDATED,
        payload:data
    }
}
export const cuclubCreated = (data) =>{
    return {
        type:CUCLUB_CREATED,
        payload:data
    }
}

export const setErrors = (error) =>{
    return {
        type:SET_ERRORS,
        payload:error
    }
}

export const fetchcuclub = () => (dispatch) => {
    
    const url = fetch_cuclub_url;
    const actions={
        loading:{type:FETCHING_TRUE},
        success:cuclubFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}

export const createCuClub = (newData) => (dispatch) => {
    
    const url = create_cuclub_url;
    const actions={
        loading:{type:LOADING_TRUE},
        success:cuclubCreated,
        error:setErrors
    }
    return postAction(actions,url,newData,dispatch);
}

export const updateCuClub = (newData) => (dispatch) => {

    const url = update_cuclub_url(newData.id);
    const actions={
        loading:{type:LOADING_TRUE},
        success:cuClubUpdated,
        error:setErrors
    }
    return postAction(actions,url,newData,dispatch,'put');
}
	