import { postAction, getAction } from "./actions";

//urls

const fetch_stats_url = (id)=>`/api/tournament/players/stats/${id}`;


//actions

const STATS_FETCHED = 'pes/stats/stats_fetched';

const LOADING_TRUE = 'pes/stats/loading_true';
const LOADING_FALSE = 'pes/stats/loading_false';
const FETCHING_TRUE = 'pes/stats/fetching_true';
const FETCHING_FALSE = 'pes/stats/fetching_false';
const SET_ERRORS = 'pes/stats/set_errors';

// reducers

const initState = {
    fetching:true,
    loading:false,
    stats:[],
    error:{},
};

export default (state=initState,action)=>{
    switch (action.type) {
        case STATS_FETCHED:
            
            return {
                ...state,
                fetching:false,
                loading:false,
                stats:action.payload,
                
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

export const statsFetched = (data) =>{
    return {
        type:STATS_FETCHED,
        payload:data
    }
}

export const setErrors = (error) =>{
    return {
        type:SET_ERRORS,
        payload:error
    }
}

export const fetchstats = (tournament_id) => (dispatch) => {
    
    const url = fetch_stats_url(tournament_id);
    const actions={
        loading:{type:FETCHING_TRUE},
        success:statsFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}