import { postAction, getAction } from "./actions";

//urls

const fetch_ratings_url = (id)=>`/api/`;
const add_ratings_url = `/api/`;
const delete_ratings_url =(id)=> `/api/`;
const update_ratings_url = (id)=>`/api/`;


//actions

const RATINGS_FETCHED = 'pes/ratings/ratings_fetched';
const RATINGS_ADDED = 'pes/ratings/ratings_added';
const RATINGS_DELETED = 'pes/ratings/ratings_deleted';
const RATINGS_UPDATED = 'pes/ratings/ratings_updated';

const LOADING_TRUE = 'pes/ratings/loading_true';
const LOADING_FALSE = 'pes/ratings/loading_false';
const FETCHING_TRUE = 'pes/ratings/fetching_true';
const FETCHING_FALSE = 'pes/ratings/fetching_false';
const SET_ERRORS = 'pes/ratings/set_errors';

// reducers

const initState = {
    fetching:true,
    loading:false,
    ratings:[],
    error:{},
};

export default (state=initState,action)=>{
    switch (action.type) {
        case RATINGS_FETCHED:
            
            return {
                ...state,
                fetching:false,
                loading:false,
                ratings:action.payload,
                
            }

        case RATINGS_ADDED:
            
            return {
                ...state,
                loading:false,
                ratings:[...state.ratings,action.payload],
                
            }
        case RATINGS_UPDATED:
            
            return {
                ...state,
                loading:false,
                ratings:state.ratings.map(item=>item.id == action.payload.id ? action.payload : item),
                
            }
        case RATINGS_DELETED:
            
            return {
                ...state,
                loading:false,
                ratings:state.ratings.filter(item => item.id != action.payload),
                
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

export const ratingsFetched = (data) =>{
    return {
        type:RATINGS_FETCHED,
        payload:data
    }
}

export const ratingsUpdated = (data) =>{
    return {
        type:RATINGS_UPDATED,
        payload:data
    }
}
export const ratingsDeleted = (id) =>{
    return {
        type:RATINGS_DELETED,
        payload:id
    }
}
export const ratingsAdded = (data) =>{
    return {
        type:RATINGS_ADDED,
        payload:data
    }
}

export const setErrors = (error) =>{
    return {
        type:SET_ERRORS,
        payload:error
    }
}

export const fetchRatings = () => (dispatch) => {
    
    const url = fetch_ratings_url;
    const actions={
        loading:{type:FETCHING_TRUE},
        success:ratingsFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}

export const addRatings = (newData) => (dispatch) => {
    
    const url = add_ratings_url;
    const actions={
        loading:{type:LOADING_TRUE},
        success:ratingsAdded,
        error:setErrors
    }
    return postAction(actions,url,newData,dispatch);
}

export const updateRatings = (newData) => (dispatch) => {

    const url = update_ratings_url();
    const actions={
        loading:{type:LOADING_TRUE},
        success:ratingsUpdated,
        error:setErrors
    }
    return postAction(actions,url,newData,dispatch,'put');
}

export const deleteRatings = (id) => (dispatch) => {

    const url = delete_ratings_url(id);
    const actions={
        loading:{type:LOADING_TRUE},
        success:ratingsDeleted,
        error:setErrors
    }
    return postAction(actions,url,{},dispatch,'delete');
}
