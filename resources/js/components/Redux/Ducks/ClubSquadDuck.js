import { playerAddedInClub } from "../actions/clubsAction";
import { postAction, getAction } from "./actions";
//urls

const fetch_club_squad_url = (id)=>`/api/`;
const add_player_squad_url = `/api/player`;
const remove_player_from_squad_url =(id)=> `/api/player/${id}`;
const update_player_in_squad_url = (id)=>`/api/player/${id}`;
//actions

const SQUAD_FETCHED = 'pes/squad/squad_fetched';
const SET_SQUAD = 'pes/squad/set_squad';
const PLAYER_ADDED = 'pes/squad/player_added';
const PLAYER_REMOVED = 'pes/squad/player_removed';
const PLAYER_UPDATED = 'pes/squad/player_updated';

const LOADING_TRUE = 'pes/squad/loading_true';
const LOADING_FALSE = 'pes/squad/loading_false';
const FETCHING_TRUE = 'pes/squad/fetching_true';
const FETCHING_FALSE = 'pes/squad/fetching_false';
const SET_ERRORS = 'pes/squad/set_errors';

// reducers

const initState = {
    fetching:true,
    loading:false,
    squad:[],
    error:{},
};

export default (state=initState,action)=>{
    switch (action.type) {
        case SET_SQUAD:
        case SQUAD_FETCHED:
            
            return {
                ...state,
                fetching:false,
                loading:false,
                squad:action.payload,
                
            }

        case PLAYER_ADDED:
            
            return {
                ...state,
                loading:false,
                squad:[...state.squad,action.payload],
                
            }
        case PLAYER_UPDATED:
            
            return {
                ...state,
                loading:false,
                squad:state.squad.map(item=>item.id == action.payload.id ? action.payload : item),
                
            }
        case PLAYER_REMOVED:
            
            return {
                ...state,
                loading:false,
                squad:state.squad.filter(item => item.id != action.payload),
                
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

export const setSquad = (data) =>{
    return {
        type:SET_SQUAD,
        payload:data.players
    }
}

export const squadPlayerUpdated = (data) =>{
    return {
        type:PLAYER_UPDATED,
        payload:data
    }
}
export const squadPlayerRemoved = (id) =>{
    return {
        type:PLAYER_REMOVED,
        payload:id
    }
}
export const squadPlayerAdded = (data) =>{
    return {
        type:PLAYER_ADDED,
        payload:data
    }
}

export const setErrors = (error) =>{
    return {
        type:SET_ERRORS,
        payload:error
    }
}

export const addPlayerInSquad = (newData) => (dispatch) => {
    
    const url = add_player_squad_url;
    const actions={
        loading:{type:LOADING_TRUE},
        success:squadPlayerAdded,
        error:setErrors
    }
    return postAction(actions,url,newData,dispatch);
}

export const updatePlayerInSquad = (newData) => (dispatch) => {

    const url = update_player_in_squad_url(newData.id);
    const actions={
        loading:{type:LOADING_TRUE},
        success:squadPlayerUpdated,
        error:setErrors
    }
    return postAction(actions,url,newData,dispatch,'put');
}

export const removePlayerFromSquad = (id) => (dispatch) => {

    const url = remove_player_from_squad_url(id);
    const actions={
        loading:{type:LOADING_TRUE},
        success:squadPlayerRemoved,
        error:setErrors
    }
    return postAction(actions,url,{},dispatch,'delete');
}
