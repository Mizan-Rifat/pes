// import { getAction, postAction } from "./actions"
import { setNotifications } from "./NotificationsDuck"

import { getAction, postAction } from "../actions/actions";


//urls

const fetch_session_admin_url = '/api/admin';
const login_session_admin_url = '/api/admin/login';
const logout_session_admin_url = '/api/admin/logout';

//actions

const SESSION_ADMIN_FETCHED = 'pes/session_admin/session_admin_fetched'
const SESSION_ADMIN_LOGGED_IN = 'pes/session_admin/session_admin_logged_in'
const SESSION_ADMIN_LOGGED_OUT = 'pes/session_admin/session_admin_logged_out'

const FETCHING_TRUE = 'pes/session_admin/fetching_true'
const FETCHING_FALSE = 'pes/session_admin/fetching_false'
const LOADING_TRUE = 'pes/session_admin/loading_true'
const LOADING_FALSE = 'pes/session_admin/loading_false'
const SET_ERRORS = 'pes/session/set_session_errors'

//reducer

const initState = {
    fetching:true,
    loading:false,
    admin:{},
    error:{
        message:'',
        errors:{},
        errorCode:''
    },
};

export default (state=initState,action)=>{
    switch (action.type) {

        case SESSION_ADMIN_FETCHED:{
            let {notifications,...admin} = action.payload;
            return {
                ...state,
                admin:admin,
                fetching:false
            }
        }
        case SESSION_ADMIN_LOGGED_IN:
            
            return {
                ...state,
                fetching:false,
                loading:false,
                admin:action.payload
               
            }

        case SESSION_ADMIN_LOGGED_OUT:
            
            return {
                ...state,
                loading:false,
                fetching:false,
                admin:{}
               
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

export const sessionAdminFetched = (admin) =>{
    return {
        type:SESSION_ADMIN_FETCHED,
        payload:admin
    }
}
export const adminLoggedIn = (admin) =>{
    return {
        type:SESSION_ADMIN_LOGGED_IN,
        payload:admin
    }
}
export const adminLoggedOut = () =>{
    return {
        type:SESSION_ADMIN_LOGGED_OUT,
    }
}
export const setErrors = (error) =>{
    return {
        type:SET_ERRORS,
        payload:error
    }
}

export const fetchSessionAdmin = () => (dispatch) =>{
  
    const url = fetch_session_admin_url,
    actions={
        loading:{type:FETCHING_TRUE},
        success:[sessionAdminFetched,setNotifications],
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}

export const loginAdmin = (formData) => (dispatch) => {
  
    const url = login_session_admin_url

    const actions={
        loading:{type:LOADING_TRUE},
        success:[adminLoggedIn,setNotifications],
        error:setErrors
    }
    const data = {
        email:formData.email,
        password:formData.password,
        remember:formData.remember,
    }

    return postAction(actions,url,data,dispatch);
}


export const logoutAdmin = () => (dispatch) => {

    const url = logout_session_admin_url

    const actions={
        loading:{type:FETCHING_TRUE},
        success:adminLoggedOut,
        error:setErrors
    }

    return postAction(actions,url,{},dispatch);
}
