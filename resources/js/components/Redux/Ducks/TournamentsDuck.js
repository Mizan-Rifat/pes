// actions 

import { postAction, getAction } from "../actions/actions";


const ALL_TOURNAMENTS_FETCHED = 'pes/tournaments/all_tournaments_fetched';
const TOURNAMENTS_LOADING_TRUE = 'pes/tournaments/loading_true';
const TOURNAMENTS_LOADING_FALSE = 'pes/tournaments/loading_false';
const TOURNAMENTS_FETCHING_TRUE = 'pes/tournaments/fetching_true';
const TOURNAMENTS_FETCHING_FALSE = 'pes/tournaments/fetching_false';
const SET_TOURNAMENTS_ERRORS = 'pes/tournaments/set_tournament_erros';
const TOURNAMENT_CREATED = 'pes/tournaments/tournament_created';
const TOURNAMENT_DELETED = 'pes/tournaments/tournament_deleted';
const TOURNAMENT_UPDATED = 'pes/tournaments/tournament_updated';

// reducers
const initState = {
    fetching:true,
    loading:false,
    tournaments:[],
    error:{},
};

export default (state=initState,action)=>{
    switch (action.type) {
        case ALL_TOURNAMENTS_FETCHED:
            
            return {
                ...state,
                fetching:false,
                loading:false,
                tournaments:action.payload,
                
            }
        case TOURNAMENT_CREATED:
            
            return {
                ...state,
                loading:false,
                tournaments:[...state.tournaments,action.payload],
                
            }
        case TOURNAMENT_UPDATED:
            
            return {
                ...state,
                loading:false,
                tournaments:state.tournaments.map(tournament=>tournament.id == action.payload.id ? action.payload : tournament),
                
            }
        case TOURNAMENT_DELETED:
            
            return {
                ...state,
                loading:false,
                tournaments:state.tournaments.filter(tournament => tournament.id != action.payload),
                
            }
        
       
        case TOURNAMENTS_LOADING_TRUE:
            
            return {
                ...state,
                loading:true
            }
        case TOURNAMENTS_LOADING_FALSE:
            
            return {
                ...state,
                loading:false
            }
        case TOURNAMENTS_FETCHING_TRUE:
            
            return {
                ...state,
                fetching:true
    
            }
        case TOURNAMENTS_FETCHING_FALSE:
            
            return {
                ...state,
                fetching:false,
            }
        case SET_TOURNAMENTS_ERRORS:
            
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


export const allTournamentsFetched = (clubs) =>{
    return {
        type:ALL_TOURNAMENTS_FETCHED,
        payload:clubs
    }
}

export const tournamentUpdated = (data) =>{
    return {
        type:TOURNAMENT_UPDATED,
        payload:data
    }
}
export const tournamentDeleted = (id) =>{
    return {
        type:TOURNAMENT_DELETED,
        payload:id
    }
}
export const tournamentCreated = (data) =>{
    return {
        type:TOURNAMENT_CREATED,
        payload:data
    }
}

export const setErrors = (error) =>{
    return {
        type:SET_TOURNAMENTS_ERRORS,
        payload:error
    }
}

export const fetchAllTournaments = () => (dispatch) => {
   
    const url ='/api/tournaments';
    const actions={
        loading:{type:TOURNAMENTS_FETCHING_TRUE},
        success:allTournamentsFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}

export const createNewTournament = (newData) => (dispatch) => {
    
    const url ='/api/tournament/create';

    const actions={
        loading:{type:TOURNAMENTS_LOADING_TRUE},
        success:tournamentCreated,
        error:setErrors
    }
    return postAction(actions,url,newData,dispatch);
}

export const updateTournament = (newData) => (dispatch) => {


    const url =`/api/tournament/${newData.id}`;
    const actions={
        loading:{type:TOURNAMENTS_LOADING_TRUE},
        success:tournamentUpdated,
        error:setErrors
    }

    return postAction(actions,url,newData,dispatch,'put');
}

export const deleteTournament = (id) => (dispatch) => {

    const url =`/api/tournament/${id}`;
    const actions={
        loading:{type:TOURNAMENTS_LOADING_TRUE},
        success:tournamentDeleted,
        error:setErrors
    }
    
    return postAction(actions,url,{},dispatch,'delete');
}

