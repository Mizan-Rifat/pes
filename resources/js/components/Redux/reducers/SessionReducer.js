const initState = {
    fetching:false,
    loading:false,
    user:{},
    admin:{},
    error:{
        message:'',
        errors:{},
        errorCode:''
    },
    success:''
};

export default (state=initState,action)=>{
    switch (action.type) {

        case 'SESSION_USER_FETCHED':
            
            return {
                ...state,
                user:action.payload,
                fetching:false
            }
        case 'SET_SESSION_USER_CLUB':
            
            return {
                ...state,
                user:{
                    ...state.user,
                    club:action.payload,
                },
                loading:false
            } 
        case 'SESSION_ADMIN_FETCHED':
            
            return {
                ...state,
                admin:action.payload,
                fetching:false
            }
        
        case 'SESSION_USER_LOGGED_IN':
            
            return {
                ...state,
                fetching:false,
                loading:false
                // user:action.payload
               
            }
        case 'SESSION_ADMIN_LOGGED_IN':
            
            return {
                ...state,
                fetching:false,
                loading:false,
                admin:action.payload
               
            }
        case 'SESSION_USER_LOGGED_OUT':
            
            return {
                ...state,
                fetching:false,
                loading:false,
                user:{}
               
            }
        case 'SESSION_ADMIN_LOGGED_OUT':
            
            return {
                ...state,
                loading:false,
                admin:{}
               
            }
        case 'SESSION_USER_REGISTERED':
            
            return {
                ...state,
                loading:false,
                fetching:false
                // users:action.payload
               
            }
        case 'SESSION_USER_UPDATED':
            
            return {
                ...state,
                loading:false,
                user:action.payload
               
            }
       
        
        case 'SESSION_FETCHING_TRUE':
            
            return {
                ...state,
                fetching:true
            }
        
        case 'SESSION_FETCHING_FALSE':
            
            return {
                ...state,
                fetching:false
            }
        case 'SESSION_LOADING_TRUE':
            
            return {
                ...state,
                loading:true
            }
        
        case 'SESSION_LOADING_FALSE':
            
            return {
                ...state,
                loading:false
            }
        case 'SET_SESSION_ERRORS':
            
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