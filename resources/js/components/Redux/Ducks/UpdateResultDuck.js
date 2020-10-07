import { postAction, getAction } from "./actions";
import { setEvents } from "./MatchEventsDuck";
import { setImages } from "./MatchImagesDuck";
import { setRatings } from "./MatchRatingsDuck";

//urls
const fetch_fixture_url = (id)=>`/api/fixture/details/${id}`;
const submit_result_url = (id) =>`/api/result/submit/${id}`;
const reject_result_url = `/api/result/reject`;
const approve_result_url =(id)=> `/api/result/approve/${id}`;
const update_updateResult_url = (id)=>`/api/`;


//actions

const FIXTURE_FETCHED = 'pes/updateresult/fixture_fetched';
const RESULT_SUBMITTED = 'pes/updateresult/result_submitted';
const RESULT_REJECTED = 'pes/updateresult/result_rejected';

const UPDATERESULT_ADDED = 'pes/updateresult/updateresult_added';
const UPDATERESULT_DELETED = 'pes/updateresult/updateresult_deleted';
const UPDATERESULT_UPDATED = 'pes/updateresult/updateresult_updated';

const LOADING_TRUE = 'pes/updateresult/loading_true';
const LOADING_FALSE = 'pes/updateresult/loading_false';
const FETCHING_TRUE = 'pes/updateresult/fetching_true';
const FETCHING_FALSE = 'pes/updateresult/fetching_false';
const SET_ERRORS = 'pes/updateresult/set_errors';
const RESET = 'pes/updateresult/reset';

// reducers
const initState = {
    fetching:true,
    loading:false,
    fixture:{},
    error:{},
};


export default (state=initState,action)=>{
    switch (action.type) {
        case FIXTURE_FETCHED:
            return {
                ...state,
                fetching:false,
                loading:false,
                fixture:action.payload.fixture,
                
            }

        case RESULT_SUBMITTED:
            
            return {
                ...state,
                loading:false,
                fixture:{
                    ...state.fixture,
                    completed:action.payload
                }
                
            }
        case RESULT_REJECTED:
            
            return {
                ...state,
                loading:false,
                fixture:{
                    ...state.fixture,
                    completed:action.payload
                }
                
            }
        case UPDATERESULT_UPDATED:
            
            return {
                ...state,
                loading:false,
                updateresult:state.updateresult.map(item=>item.id == action.payload.id ? action.payload : item),
                
            }
        case UPDATERESULT_DELETED:
            
            return {
                ...state,
                loading:false,
                updateresult:state.updateresult.filter(item => item.id != action.payload),
                
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
        case RESET:
            return initState;
    
        default:
            return state;
    }
}

// action_creators

export const fixtureFetched = (data) =>{
    return {
        type:FIXTURE_FETCHED,
        payload:data
    }
}


export const updateresultUpdated = (data) =>{
    return {
        type:UPDATERESULT_UPDATED,
        payload:data
    }
}
export const updateresultDeleted = (id) =>{
    return {
        type:UPDATERESULT_DELETED,
        payload:id
    }
}
export const resultSubmitted = (data) =>{
    return {
        type:RESULT_SUBMITTED,
        payload:data
    }
}

export const setErrors = (error) =>{
    return {
        type:SET_ERRORS,
        payload:error
    }
}
export const resetUpdateResult = () =>{
    return {
        type:RESET,
    }
}
export const resultApproved = () =>{
    return {
        type:RESULT_APPROVED,
    }
}
export const resultRejected = (data) =>{
    return {
        type:RESULT_REJECTED,
        payload:data
    }
}

export const fetchFixture = (id) => (dispatch) => {
    
    const url = fetch_fixture_url(id);
    const actions={
        loading:{type:FETCHING_TRUE},
        success:[fixtureFetched,setEvents,setRatings,setImages],
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}

export const addupdateresult = (newData) => (dispatch) => {
    
    const url = add_updateResult_url;
    const actions={
        loading:{type:LOADING_TRUE},
        success:updateresultAdded,
        error:setErrors
    }
    return postAction(actions,url,newData,dispatch);
}

export const updateupdateresult = (newData) => (dispatch) => {

    const url = update_updateResult_url();
    const actions={
        loading:{type:LOADING_TRUE},
        success:updateresultUpdated,
        error:setErrors
    }
    return postAction(actions,url,newData,dispatch,'put');
}

export const approveResult = (id) => (dispatch) => {

    const url = approve_result_url(id);
    const actions={
        loading:{type:LOADING_TRUE},
        success:{type:LOADING_FALSE},
        error:setErrors
    }
    return postAction(actions,url,{},dispatch,'put');
}

export const submitResult = (id) => (dispatch) => {
    
    const url = submit_result_url(id),
    actions={
        loading:{type:LOADING_TRUE},
        success:resultSubmitted,
        error:setErrors
    }
    return postAction(actions,url,{},dispatch,'put');
}
export const rejectResult = (data) => (dispatch) => {
    
    const url = reject_result_url,
    actions={
        loading:{type:LOADING_TRUE},
        success:resultRejected,
        error:setErrors
    }
    return postAction(actions,url,data,dispatch);
}
