import { postAction, getAction } from "./actions";

//urls

const fetch_club_models_url = `/api/clubmodels`;
const add_club_models_url = `/api/clubmodel`;
const delete_club_models_url =(id)=> `/api/clubmodel/${id}`;
const update_club_models_url = (id)=>`/api/clubmodel/${id}`;


//actions

const CLUB_MODELS_FETCHED = 'pes/club_models/club_models_fetched';
const CLUB_MODELS_ADDED = 'pes/club_models/club_models_added';
const CLUB_MODELS_DELETED = 'pes/club_models/club_models_deleted';
const CLUB_MODELS_UPDATED = 'pes/club_models/club_models_updated';

const LOADING_TRUE = 'pes/club_models/loading_true';
const LOADING_FALSE = 'pes/club_models/loading_false';
const FETCHING_TRUE = 'pes/club_models/fetching_true';
const FETCHING_FALSE = 'pes/club_models/fetching_false';
const SET_ERRORS = 'pes/club_models/set_errors';

// reducers

const initState = {
    fetching:true,
    loading:false,
    clubs:[],
    error:{},
};

export default (state=initState,action)=>{
    switch (action.type) {
        case CLUB_MODELS_FETCHED:
            
            return {
                ...state,
                fetching:false,
                loading:false,
                clubs:action.payload,
                
            }

        case CLUB_MODELS_ADDED:
            
            return {
                ...state,
                loading:false,
                clubs:[...state.clubs,action.payload],
                
            }
        case CLUB_MODELS_UPDATED:
            
            return {
                ...state,
                loading:false,
                clubs:state.clubs.map(item=>item.id == action.payload.id ? action.payload : item),
                
            }
        case CLUB_MODELS_DELETED:
            
            return {
                ...state,
                loading:false,
                clubs:state.clubs.filter(item => item.id != action.payload),
                
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

export const club_modelsFetched = (data) =>{
    return {
        type:CLUB_MODELS_FETCHED,
        payload:data
    }
}

export const club_modelsUpdated = (data) =>{
    return {
        type:CLUB_MODELS_UPDATED,
        payload:data
    }
}
export const club_modelsDeleted = (id) =>{
    return {
        type:CLUB_MODELS_DELETED,
        payload:id
    }
}
export const club_modelsAdded = (data) =>{
    return {
        type:CLUB_MODELS_ADDED,
        payload:data
    }
}

export const setErrors = (error) =>{
    return {
        type:SET_ERRORS,
        payload:error
    }
}

export const fetchClub_models = () => (dispatch) => {
    
    const url = fetch_club_models_url;
    const actions={
        loading:{type:FETCHING_TRUE},
        success:club_modelsFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}

export const addClub_models = (newData) => (dispatch) => {
    
    const url = add_club_models_url;
    const actions={
        loading:{type:LOADING_TRUE},
        success:club_modelsAdded,
        error:setErrors
    }
    return postAction(actions,url,newData,dispatch);
}

export const updateClub_models = (data) => (dispatch) => {

    const url = update_club_models_url(data.id);
    const actions={
        loading:{type:LOADING_TRUE},
        success:club_modelsUpdated,
        error:setErrors
    }
    return postAction(actions,url,data,dispatch,'put');
}

export const deleteClub_models = (id) => (dispatch) => {

    const url = delete_club_models_url(id);
    const actions={
        loading:{type:LOADING_TRUE},
        success:club_modelsDeleted,
        error:setErrors
    }
    return postAction(actions,url,{},dispatch,'delete');
}
