// import { getAction, postAction } from "./actions"
import { setNotifications } from "./NotificationsDuck"
import { getAction, postAction } from "../actions/actions";
import { setCuClub } from "./CuClubDuck";

//urls
const session_user_fetching_url = '/api/user';
const login_session_user_url = '/login';
const update_session_user_url =(id)=> `/api/user/${id}`;

//actions
const SESSION_USER_FETCHED = 'pes/session/session_user_fetched'
const SESSION_USER_LOGGED_IN = 'pes/session/session_user_logged_in'
const SESSION_USER_LOGGED_OUT = 'pes/session/session_user_logged_out'
const SESSION_USER_REGISTERED = 'pes/session/session_user_registered'
const SESSION_USER_UPDATED = 'pes/session/session_user_updated'
const SET_SESSION_USER_CLUB = 'pes/session/set_session_user_club'

const FETCHING_TRUE = 'pes/session_user/fetching_true'
const FETCHING_FALSE = 'pes/session_user/fetching_false'
const LOADING_TRUE = 'pes/session_user/loading_true'
const LOADING_FALSE = 'pes/session_user/loading_false'

const SET_ERRORS = 'pes/session/set_session_errors'
//reducer

const initState = {
    fetching:true,
    loading:false,
    user:{},
    error:{
        message:'',
        errors:{},
        errorCode:''
    },
};

export default (state=initState,action)=>{
    switch (action.type) {

        case SESSION_USER_FETCHED:{
            let {notifications,...user} = action.payload;
            return {
                ...state,
                user:user,
                fetching:false
            }
        }
        case SET_SESSION_USER_CLUB:
            
            return {
                ...state,
                user:{
                    ...state.user,
                    club:action.payload,
                },
                loading:false
            } 
        case SESSION_USER_LOGGED_IN:{
            let {notifications,...user} = action.payload;
            return {
                ...state,
                user:user,
                fetching:false,
                loading:false
               
            }
        }
  
        case SESSION_USER_LOGGED_OUT:
            
            return {
                ...state,
                fetching:false,
                loading:false,
                user:{}
               
            }
 
        case SESSION_USER_REGISTERED:
            
            return {
                ...state,
                loading:false,
                fetching:false
               
            }
        case SESSION_USER_UPDATED:
            
            return {
                ...state,
                loading:false,
                user:action.payload
               
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


export const sessionUserFetched = (user) =>{
    return {
        type:SESSION_USER_FETCHED,
        payload:user
    }
}
export const sessionUserUpdated = (user) =>{
    return {
        type:SESSION_USER_UPDATED,
        payload:user
    }
}

export const userLoggedIn = (user) =>{
    return {
        type:SESSION_USER_LOGGED_IN,
        payload:user
    }
}

export const userLoggedOut = () =>{
    return {
        type:SESSION_USER_LOGGED_OUT,
    }
}

export const userRegistered = (user) =>{
    return {
        type:SESSION_USER_REGISTERED,
        payload:user
    }
}
export const setErrors = (error) =>{
    return {
        type:SET_ERRORS,
        payload:error
    }
}
export const setSessionUserClub = (club) =>{
    console.log({club})
    return {
        type:SET_SESSION_USER_CLUB,
        payload:club
    }
}

export const fetchSessionUser = () => (dispatch) =>{
  
    const url = session_user_fetching_url
    const actions={
        loading:{type:FETCHING_TRUE},
        success:[sessionUserFetched,setNotifications,setCuClub],
        error:setErrors
    }
    return getAction(actions,url,dispatch);
}


export const updateSessionUser = (data) => (dispatch) => {
    
    const url = update_session_user_url(data.id);

    const actions={
        loading:{type:LOADING_TRUE},
        success:sessionUserUpdated,
        error:setErrors
    }
    return postAction(actions,url,data,dispatch,'put');
}

export const loginUser = (formData) => (dispatch) => {
  
    const url = login_session_user_url
    const actions={
        loading:{type:LOADING_TRUE},
        success:[userLoggedIn,setNotifications,setCuClub],
        error:setErrors
    }
    const data = {
        email:formData.email,
        password:formData.password,
        remember:formData.remember,
    }

    return postAction(actions,url,data,dispatch);
}
export const logoutUser = () => (dispatch) => {
  
    const url ='/logout'
    const actions={
        loading:{type:FETCHING_TRUE},
        success:userLoggedOut,
        error:setErrors
    }
    return postAction(actions,url,{},dispatch);
}
export const registerUser = (formData) => (dispatch) => {
  
    const url ='/register'
    const actions={
        loading:{type:LOADING_TRUE},
        success:userRegistered,
        error:setErrors
    }

    const data = {
        name:formData.name,
        email:formData.email,
        password:formData.password,
        password_confirmation:formData.password_confirmation,
    }

    return postAction(actions,url,data,dispatch);
}

