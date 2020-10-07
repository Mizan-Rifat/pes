import { postAction, getAction } from "./actions";

//urls

const fetch_result_details_url = (id)=>`/api/result/${id}`;
const add_result_details_url = `/api/`;
const delete_result_details_url =(id)=> `/api/`;
const update_result_details_url = (id)=>`/api/`;


//actions

const RESULT_DETAILS_FETCHED = 'pes/result_details/result_details_fetched';

const LOADING_TRUE = 'pes/result_details/loading_true';
const LOADING_FALSE = 'pes/result_details/loading_false';
const FETCHING_TRUE = 'pes/result_details/fetching_true';
const FETCHING_FALSE = 'pes/result_details/fetching_false';
const SET_ERRORS = 'pes/result_details/set_errors';

// reducers

const initState = {
    fetching:true,
    loading:false,
    result:[],
    error:{},
};

export default (state=initState,action)=>{
    switch (action.type) {
        case RESULT_DETAILS_FETCHED:
            
            return {
                ...state,
                fetching:false,
                loading:false,
                result:action.payload,
                
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

export const result_detailsFetched = (data) =>{
    return {
        type:RESULT_DETAILS_FETCHED,
        payload:data
    }
}

export const setErrors = (error) =>{
    return {
        type:SET_ERRORS,
        payload:error
    }
}

export const fetchResultDetails = (id) => (dispatch) => {
    
    const url = fetch_result_details_url(id);
    const actions={
        loading:{type:FETCHING_TRUE},
        success:result_detailsFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}
