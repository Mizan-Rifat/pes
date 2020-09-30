// import { sessionLoadingTrue,sessionUserUpdated,setErrors as setSessionErrors } from "./SessionAction";

import { postAction, getAction } from "../actions/actions";

//urls

const users_fetching_url = '/api/users';
const user_resource_url = (id)=>`/api/user/${id}`;


//Actions

const ALL_USERS_FETCHED='pes/users/all_users_fetched';
const USERS_LOADING_TRUE='pes/users/user_loading_true';
const USERS_LOADING_FALSE='pes/users/user_loading_false';
const USERS_FETCHING_TRUE='pes/users/user_fetching_true';
const USERS_FETCHING_FALSE='pes/users/user_fetching_false';
const USER_DELETED='pes/users/user_deleted';
const USER_UPDATED='pes/users/user_updated';
const SET_USERS_ERRORS='pes/users/set_users_erros';

const initState = {
    fetching:true,
    loading:true,
    users:[],
    error:{},
};

export default (state=initState,action)=>{
    switch (action.type) {
        case ALL_USERS_FETCHED:
            
            return {
                ...state,
                users:action.payload,
                loading:false,
                fetching:false
            }

        case USER_DELETED:
            
            return {
                ...state,
                loading:false,
                users:state.users.filter(user=> user.id != action.payload),
            
            }
        case USER_UPDATED:
            
            return {
                ...state,
                loading:false,
                users:state.users.map(user=> user.id == action.payload.id ? action.payload : user)
            }
       
        
        case USERS_LOADING_TRUE:
            
            return {
                ...state,
                loading:true
            }
        
        case USERS_LOADING_FALSE:
            
            return {
                ...state,
                loading:false
            }
        case USERS_FETCHING_TRUE:
            
            return {
                ...state,
                fetching:true
            }
        
        case USERS_FETCHING_FALSE:
            
            return {
                ...state,
                fetching:false
            }
        case SET_USERS_ERRORS:
            
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


export const allUsersFetched = (users) =>{
    return {
        type:ALL_USERS_FETCHED,
        payload:users
    }
}

export const userDeleted = (id) =>{
    return {
        type:USER_DELETED,
        payload:id
    }
}
export const userUpdated = (user) =>{
    return {
        type:USER_UPDATED,
        payload:user
    }
}
export const setErrors = (error) =>{
    return {
        type:SET_USERS_ERRORS,
        payload:error
    }
}

export const fetchAllUsers = () => (dispatch) => {
   
    const url = users_fetching_url;
    const actions={
        loading:{type:USERS_FETCHING_TRUE},
        success:allUsersFetched,
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}

export const deleteUser = (id) => (dispatch) => {
    
    const url = user_resource_url(id);

    const actions={
        loading:{type:USERS_LOADING_TRUE},
        success:userDeleted,
        error:setErrors
    }
    return postAction(actions,url,{},dispatch,'delete');
}

export const updateUser = (newData) => (dispatch) => {

    
    const url = user_resource_url(newData.id);

    const actions={
        loading:{type:USERS_LOADING_TRUE},
        success:userUpdated,
        error:setErrors
    }
    
    return postAction(actions,url,newData,dispatch,'put');
}


