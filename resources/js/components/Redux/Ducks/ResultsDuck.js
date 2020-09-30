
//urls

import { getAction } from "../actions/actions";

const tournament_results_fetching_url = (id)=> `/api/tournament/results/${id}`;
const update_result_url = '';
const add_result_url = '';
const delete_result_url = '';


//actions

const TOURNAMENT_RESULTS_FETCHED = 'pes/results/tournament_results_fetched';
const TOURNAMENT_RESULT_DELETED = 'pes/results/tournament_results_deleted';
const TOURNAMENT_RESULT_UPDATED = 'pes/results/tournament_results_updated';
const TOURNAMENT_RESULT_ADDED = 'pes/results/tournament_fixtures_added';

const LOADING_TRUE = 'pes/results/loading_true';
const LOADING_FALSE = 'pes/results/loading_false';
const FETCHING_FALSE = 'pes/results/fetching_true';
const FETCHING_TRUE = 'pes/results/fetching_false';
const SET_ERRORS = 'pes/results/set_errors';

const initState = {
    fetching:true,
    loading:true,
    results:[],
    error:{}
};

export default (state=initState,action)=>{
    switch (action.type) {

        case TOURNAMENT_RESULTS_FETCHED:
            
            return {
                ...state,
                results:action.payload,
                loading:false,
                fetching:false
            }
     
        case TOURNAMENT_RESULT_UPDATED:
            
            return {
                ...state,
                loading:false,
                results:state.results.map(result=>(
                    result.id === action.payload.result.id ? action.payload.result : result 
                ))
            }
        case TOURNAMENT_RESULT_DELETED:
            
            return {
                ...state,
                loading:false,
                results:state.results.filter(result=> !action.payload.ids.includes(result.id)),
                success:action.payload.message
            } 
        case TOURNAMENT_RESULT_ADDED:
            
            return {
                ...state,
                loading:false,
                results:state.results.filter(result=> !action.payload.ids.includes(result.id)),
                success:action.payload.message
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

//action creators


export const tournamentResultsFetched = (results) =>{
    return {
        type:TOURNAMENT_RESULTS_FETCHED,
        payload:results
    }
}

export const tournamentResultsAdded = (data) =>{
    return {
        type:TOURNAMENT_RESULT_ADDED,
        payload:data
    }
}
export const tournamentResultsUpdated = (data) =>{
    return {
        type:TOURNAMENT_RESULT_UPDATED,
        payload:data
    }
}

export const tournamentResultsDeleted = (id) =>{
    return {
        type:TOURNAMENT_RESULT_DELETED,
        payload:id
    }
}
export const setErrors = (errors) =>{
    return {
        type:SET_ERRORS,
        payload:errors
    }
}

export const fetchTournamentResults = (tournament_id) => (dispatch) =>{
  
    const url = tournament_results_fetching_url(tournament_id),
    actions={
        loading:{type:FETCHING_TRUE},
        success:tournamentResultsFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}
