import { postAction, getAction } from "./actions";

//urls

const fetch_standings_url = (id)=>`/api/tournament/standings/${id}`;

//actions

const STANDINGS_FETCHED = 'pes/standings/standings_fetched';

const LOADING_TRUE = 'pes/standings/loading_true';
const LOADING_FALSE = 'pes/standings/loading_false';
const FETCHING_TRUE = 'pes/standings/fetching_true';
const FETCHING_FALSE = 'pes/standings/fetching_false';
const SET_ERRORS = 'pes/standings/set_errors';

// reducers

const initState = {
    fetching:true,
    loading:false,
    standings:[],
    error:{},
};

export default (state=initState,action)=>{
    switch (action.type) {
        case STANDINGS_FETCHED:
            
            return {
                ...state,
                fetching:false,
                loading:false,
                standings:action.payload,
                
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

export const standingsFetched = (data) =>{
    return {
        type:STANDINGS_FETCHED,
        payload:data
    }
}

export const setErrors = (error) =>{
    return {
        type:SET_ERRORS,
        payload:error
    }
}

export const fetchstandings = (tournament_id) => (dispatch) => {
    
    const url = fetch_standings_url(tournament_id);
    const actions={
        loading:{type:FETCHING_TRUE},
        success:standingsFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}
