// Actions

import { postAction, getAction } from "../actions/actions";

const TOURNAMENT_INFO_FETCHED = 'pes/tournament/info_fetched';
const SET_TOURNAMENT = 'pes/tournament/set_tournament';
const TOURNAMENT_LOADING_TRUE = 'pes/tournament/loading_true';
const TOURNAMENT_LOADING_FALSE = 'pes/tournament/loading_false';
const TOURNAMENT_FETCHING_TRUE = 'pes/tournament/fetching_true';
const TOURNAMENT_FETCHING_FALSE = 'pes/tournament/fetching_false';
const SET_TOURNAMENT_ERRORS = 'pes/tournament/set_tournament_erros';


// reducer

const initState = {
    fetching:true,
    loading:false,
    tournamentInfo:{},
    error:{},
};

export default (state=initState,action)=>{

    switch (action.type) {

        case SET_TOURNAMENT:
        case TOURNAMENT_INFO_FETCHED:
            
            return {
                ...state,
                fetching:false,
                tournamentInfo:action.payload,
                
            }

        case TOURNAMENT_LOADING_TRUE:
            
            return {
                ...state,
                loading:true
            }
        case TOURNAMENT_LOADING_FALSE:
            
            return {
                ...state,
                loading:false
            }
        case TOURNAMENT_FETCHING_TRUE:
            
            return {
                ...state,
                fetching:true
            }
        case TOURNAMENT_FETCHING_FALSE:
            
            return {
                ...state,
                fetching:false
            }
        case SET_TOURNAMENT_ERRORS:
            
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



export const setTournament = (data) =>{
    return {
        type:SET_TOURNAMENT,
        payload:data
    }
}
export const infoFetched = (data) =>{
    return {
        type:TOURNAMENT_INFO_FETCHED,
        payload:data
    }
}
export const infoUpdated = (tournament) =>{
    return {
        type:INFO_UPDATED,
        payload:tournament
    }
}

export const setErrors = (error) =>{
    return {
        type:SET_TOURNAMENT_ERRORS,
        payload:error
    }
}

export const fetchInfo = (slug) => (dispatch) => {

    const url =`/api/tournament/${slug}`,
    actions={
        loading:{type:TOURNAMENT_FETCHING_TRUE},
        success:infoFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}



