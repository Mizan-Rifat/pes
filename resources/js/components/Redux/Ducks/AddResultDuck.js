import { postAction, getAction } from "./actions";

//urls
const fetch_fixture_url = (id)=>`/api/fixture/${id}?players=1`;
const add_result_url = `/api/result/add`;
const delete_updateResult_url =(id)=> `/api/`;
const update_updateResult_url = (id)=>`/api/`;


//actions

const FIXTURE_FETCHED = 'pes/updateresult/fixture_fetched';
const UPDATERESULT_ADDED = 'pes/updateresult/updateresult_added';
const UPDATERESULT_DELETED = 'pes/updateresult/updateresult_deleted';
const UPDATERESULT_UPDATED = 'pes/updateresult/updateresult_updated';

const LOADING_TRUE = 'pes/updateresult/loading_true';
const LOADING_FALSE = 'pes/updateresult/loading_false';
const FETCHING_TRUE = 'pes/updateresult/fetching_true';
const FETCHING_FALSE = 'pes/updateresult/fetching_false';
const SET_ERRORS = 'pes/updateresult/set_errors';

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
                fixture:action.payload,
                
            }

        case UPDATERESULT_ADDED:
            
            return {
                ...state,
                loading:false,
                updateresult:[...state.updateresult,action.payload],
                
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
export const updateresultAdded = (data) =>{
    return {
        type:UPDATERESULT_ADDED,
        payload:data
    }
}

export const setErrors = (error) =>{
    return {
        type:SET_ERRORS,
        payload:error
    }
}

export const fetchFixture = (id) => (dispatch) => {
    
    const url = fetch_fixture_url(id);
    const actions={
        loading:{type:FETCHING_TRUE},
        success:fixtureFetched,
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

export const deleteupdateresult = (id) => (dispatch) => {

    const url = delete_updateResult_url(id);
    const actions={
        loading:{type:LOADING_TRUE},
        success:updateresultDeleted,
        error:setErrors
    }
    return postAction(actions,url,{},dispatch,'delete');
}

export const addMatchResult = (data,config) => (dispatch) => {
    
    const url = add_result_url,
    actions={
        loading:{type:LOADING_TRUE},
        success:{type:LOADING_FALSE},
        error:setErrors
    }
    return postAction(actions,url,data,dispatch,'post',config);
}
