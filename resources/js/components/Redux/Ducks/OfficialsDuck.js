import { postAction, getAction } from "./actions"
import Tournament from "../../AdminComponents/views/Tournaments/Tournament";
//urls

const fetch_officials_url = (id) => `/api/tournament/officials/${id}`;
const add_official_url = `/api/tournament/officials/add`;
const remove_official_url = `/api/tournament/officials/remove`;

//actions

const OFFICIALS_FETCHED = 'pes/officials/officials_fetched';
const OFFICIAL_ADDED = 'pes/officials/officials_added';
const OFFICIAL_REMOVED = 'pes/officials/officials_removed';

const LOADING_TRUE = 'pes/officials/loading_true';
const LOADING_FALSE = 'pes/officials/loading_false';
const FETCHING_FALSE = 'pes/officials/fetching_true';
const FETCHING_TRUE = 'pes/officials/fetching_false';
const SET_ERRORS = 'pes/officials/set_errors';

//reducer


const initState = {
    fetching:true,
    loading:false,
    officials:[],
    error:{},
};

export default (state=initState,action)=>{
    switch (action.type) {

        case OFFICIALS_FETCHED:
            
            return {
                ...state,
                loading:false,
                fetching:false,
                officials:action.payload,
                
            }
        case OFFICIAL_ADDED:
            
            return {
                ...state,
                loading:false,
                officials:[...state.officials,action.payload],
                
            }
        case OFFICIAL_REMOVED:
            
            return {
                ...state,
                loading:false,
                officials:state.officials.filter(official => official.id != action.payload),
                
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
                fetching:false
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


//action_creators

export const offcialsFetched = (data) =>{
    return {
        type:OFFICIALS_FETCHED,
        payload:data
    }
}
export const officialsAdded = (official) =>{
    return {
        type:OFFICIAL_ADDED,
        payload:official
    }
}
export const officialRemoved = (user_id) =>{
    return {
        type:OFFICIAL_REMOVED,
        payload:user_id
    }
}

export const setError = (error) =>{
    return {
        type:SET_ERRORS,
        payload:error
    }
}

export const fetchOfficials = (tournament_id) => (dispatch) =>{
  
    const url =fetch_officials_url(tournament_id),
    actions={
        loading:{type:FETCHING_TRUE},
        success:offcialsFetched,
        error:setError
    }
    return getAction(actions,url,dispatch);
}


export const addOfficial = (data) => (dispatch) => {

    const url = add_official_url;
    const actions={
        loading:{type:LOADING_TRUE},
        success:officialsAdded,
        error:setError
    }
    return postAction(actions,url,data,dispatch);
}


export const removeOfficial = (data) => (dispatch) => {
 
    const url = remove_official_url;
    const actions={
        loading:{type:LOADING_TRUE},
        success:officialRemoved,
        error:setError
    }
    return postAction(actions,url,data,dispatch);
}


