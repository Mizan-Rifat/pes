const initState = {
    loading:false,
    userLoading:false,
    user:{},
    error:{
        message:'',
        errors:{},
        errorCode:''
    },
    success:''
};

export default (state=initState,action)=>{
    switch (action.type) {
        case 'USER_FETCHED':
            
            return {
                ...state,
                users:action.payload,
                loading:false
            }
        
        case 'USER_LOGGED_IN':
            
            return {
                ...state,
                loading:false,
                user:action.payload
               
            }
        case 'USER_LOGGED_OUT':
            
            return {
                ...state,
                loading:false,
                user:{}
               
            }
        case 'USER_REGISTERED':
            
            return {
                ...state,
                loading:false,
                // users:action.payload
               
            }
       
        
        case 'SESSION_USER_LOADING_TRUE':
            
            return {
                ...state,
                userLoading:true
            }
        
        case 'SESSION_USER_LOADING_FALSE':
            
            return {
                ...state,
                userLoading:false
            }
        case 'SESSION_AUTH_LOADING_TRUE':
            
            return {
                ...state,
                loading:true
            }
        
        case 'SESSION_AUTH_LOADING_FALSE':
            
            return {
                ...state,
                loading:false
            }
        case 'SET_SESSION_ERRORS':
            
            return {
                ...state,
                loading:false,
                error:action.payload
            }
    
        default:
            return state;
    }
}